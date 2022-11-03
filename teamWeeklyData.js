import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';


export async function getWeeklyData(seasonId, teamId, leagueId, weeksWithData, teams) {
  
  // Build the driver for navigating the url via Chrome
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // TODO: for loop through all previous weeks
    const week = 1;

    // Navigate to the team's weekly scores
    let weeklyScoreUrl = `https://fantasy.espn.com/football/team?seasonId=${seasonId}&leagueId=${leagueId}&teamId=${teamId}&scoringPeriodId=${week}&statSplit=singleScoringPeriod`
    await driver.get(weeklyScoreUrl);

    // Wait for the players table to load
    await driver.wait(until.elementLocated(
      By.className('Table__sub-header Table__TR Table__even'))
      , 15000
    );

    // -------- headers[] -------- 
    // Get the table headers
    let headerEls = await driver.findElement(By.className('Table__sub-header Table__TR Table__even'));
    let headers = await headerEls.getText().then((text) =>
      Promise.resolve(text.split('\n'))      
    );

    // -------- playerData[] -------- 
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

    // -------- ISSUE HANDLING FOR headers & playersData --------
    // Issue: HEALTH @ playersData[2] (if player is not healthy) but not in headers
    // Resolution: add 'HEALTH' as headers[2]
    headers.splice(2, 0, "HEALTH");
    
    // Issue: TEAM @ playersData[2] || [3] (if HEALTH) but not in headers
    // Resolution: Handle Issue: add 'TEAM' as headers[3]
    headers.splice(3, 0, 'TEAM');

    // Issue: POS @ playersData[3] (or [4] if HEALTH) but not in headers
    // Resolution: Handle Issue 4: add 'POS' as headers[4]
    headers.splice(4, 0, 'POS');

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

    // --------- players[{statDesc: stat, ...}] ---------
    let players = []

    // For each player...
    for (let iPlayers in playersData) {
      
      // Create a 'player' object with {statDesc: stat}
      var cols = headers;
      var rows = playersData[iPlayers];
      var player = {};
      for (var i = 0; i < cols.length; i++) {
        player[cols[i]] = rows[i];
      }

      // Add the 'player' to 'players'
      players.push(player);
    }
    console.log(players)

  } finally {
    await driver.quit();
  }
}
getWeeklyData(2022, 2, 84532749, 8, 'teams');