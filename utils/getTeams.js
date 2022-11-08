import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';

function getActualNumTeams(num) {
  // If 'numTeams' >14, then
  // -- divisional standings must be removed from 'teamEls'
  if (num > 14) {
    // Since divisional standings account for double the teams, we halve numTeams
    return num / 2;
  } else {
    return num;
  }
};

export async function getTeams(leagueId, seasonId, weeksWithData) {
  
  // Build the driver for navigating the url via Chrome
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to the league standings
    let leagueUrl = `https://fantasy.espn.com/football/league/standings?leagueId=${leagueId}`
    await driver.get(leagueUrl);

    // Wait for the standings table to load, then get all teamIds
    await driver.wait(until.elementLocated(
      By.className('teamName truncate'))
      , 15000
    );
    let teamEls = await driver.findElements(By.className('teamName truncate'));

    // Handle/ignore rankings by division to get the 'actualNumTeams'
    let fetchedNumTeams = teamEls.length;
    let actualNumTeams = getActualNumTeams(teamEls.length);

    // Loop through the 'actualNumTeams' to populate 'teams' with:
    // -- teamId: INT
    // -- name: STRING
    // -- dataByWeek: []
    let teams = [];
    for (let iTeams = 0; iTeams < actualNumTeams; iTeams++) {

      // Navigate to the team's week 1 url
      let id = iTeams + 1;
      let teamUrl = `https://fantasy.espn.com/football/team?seasonId=${seasonId}&leagueId=${leagueId}&teamId=${id}&scoringPeriodId=1&statSplit=singleScoringPeriod`;
      await driver.get(teamUrl);
      
      // Wait until the page has loaded, then get all team names
      await driver.wait(until.elementLocated(
        By.className('Table__sub-header Table__TR Table__even'))
        , 15000
      );
      let teamEl = await driver.findElement(By.className('teamName truncate'));
      let name = await teamEl.getText().then((text) => Promise.resolve(text));

      // Get the 'headers' for the weekly data table (only once)
      if (iTeams == 0) {

        // Get the headers text as an array
        let headerEls = await driver.findElement(By.className('Table__sub-header Table__TR Table__even'));
        var headers = await headerEls.getText().then((text) =>
          Promise.resolve(text.split('\n'))
        );

        // Issue: HEALTH @ playersData[2] (if player is not healthy) but not in headers
        // Resolution: add 'HEALTH' as headers[2]
        headers.splice(2, 0, "HEALTH");
        
        // Issue: TEAM @ playersData[2] || [3] (if HEALTH) but not in headers
        // Resolution: Handle Issue: add 'TEAM' as headers[3]
        headers.splice(3, 0, 'TEAM');

        // Issue: POS @ playersData[3] (or [4] if HEALTH) but not in headers
        // Resolution: Handle Issue 4: add 'POS' as headers[4]
        headers.splice(4, 0, 'POS');
      }

      // Get the dataByWeek
      let dataByWeek = [];
      for (let week = 1; week < weeksWithData + 1; week++) {
        
        let weeklyDataIsEmpty = true;
        while (weeklyDataIsEmpty) {
          // Navigate to the team's weekly score (remember: the first iteration is already at the week 1 page)
          if (week != 1) {
            let weeklyScoreUrl = `https://fantasy.espn.com/football/team?seasonId=${seasonId}&leagueId=${leagueId}&teamId=${id}&scoringPeriodId=${week}&statSplit=singleScoringPeriod`
            await driver.get(weeklyScoreUrl);
          }
          
          // Wait until the page has loaded, then get all team names
          await driver.wait(until.elementLocated(
            By.className('game-status-inline flex'))
            , 15000
          );

          // Get this week's 'weeklyData'
          var weeklyData = await getWeeklyData(driver, headers); 

          // Satisfy the while loop condition if the 'weeklyData' was collected
          if (weeklyData.length != 0) {
            weeklyDataIsEmpty = false;
          }
        };
        
        // Push the 'weeklyData' to 'dataByWeek'
        dataByWeek.push(weeklyData);
      }

      // Push 'id', 'name', and 'dataByWeek' to 'teams'
      teams.push(
        {
          id: id,
          name: name,
          dataByWeek: dataByWeek
        }
      );
    }

    return teams;

  } finally {
    await driver.quit();
  }
};

async function getWeeklyData(driver, headers) {

  // -------- playersData[] -------- 
  // Get all playerRowEls
  let playerRowEls = await driver.findElements(By.className('Table__TR Table__TR--lg Table__odd'));

  // For each playerRowEl get the player's stats and push to 'playersData'
  let playersData = []
  for (let i = 0; i < playerRowEls.length; i++) {

    // Loop through the data points in the playerRowEl
    await playerRowEls[i].getText().then((text) => {
      let stats = text.split('\n');
      playersData.push(stats);
    });
  }

  // Issue: team 'TOTALS' data included in playersData
  // Resolution: Loop through playersData and remove 'TOTALS' data
  for (let player in playersData) {
    if (playersData[player][0] == 'TOTALS') {
      playersData.splice(player, 1)
    }
  }

  // Issue: Healthy players don't have 'HEALTH' status
  // Resolution: if Healthy, add 'H' @ playersData[2]
  for (let player in playersData) {
    let healthStatuses = ['P', 'Q', 'D', 'O', 'IR', 'SSPD'];
    let playerHealth = playersData[player][2];
    let isHealthStatus = healthStatuses.includes(playerHealth);
    if (!isHealthStatus) {
      playersData[player].splice(2, 0, 'H');
    }
  }

  // --------- weeklyData[] ---------
  let weeklyData = [];
  // For each player...
  for (let iPlayers in playersData) {
    
    // Create a 'player' object with {statDesc: stat}
    let cols = headers;
    let rows = playersData[iPlayers];
    let player = {};
    for (let i = 0; i < cols.length; i++) {
      player[cols[i]] = rows[i];
    }

    // Add the 'player' to 'weeklyData'
    weeklyData.push(player);
  }

  return weeklyData;
}