import { Builder, By, promise, until } from 'selenium-webdriver';
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

export async function getTeams2(leagueId, seasonId) {
  
  // Build the driver for navigating the url via Chrome
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the League Members page
    await driver.get(`https://fantasy.espn.com/football/tools/leaguemembers?leagueId=${leagueId}`);

    // Team icons load last, so wait for icons to ensure the page is fully loaded
    let teamIconClass = 'Image team-logo w-100';
    let customTeamIconClass = 'Image team-logo w-100';
    try {
      // Find a standard icon
      await driver.wait(until.elementLocated(By.className(teamIconClass)), 15000);
    } catch {
      // Find a custom icon
      await driver.wait(until.elementLocated(By.className(customTeamIconClass)), 15000);
    }

    // Get an array of 'teams' where team = {id: , name:}
    let teams = await getIdsAndNames(driver);
    console.log(teams);

  } finally {
    await driver.quit();
  }
};

async function getIdsAndNames(driver) {
  let teams = [];

  // Loop through each league member to declare their 'team', then push their 'team' to 'teams' 
  let nameEls = await driver.findElements(By.className('teamName truncate'));
  for (let i = 0; i < nameEls.length; i++) {      
    let team = {};

    // Decare the 'name' and 'id' for the 'team'
    let name = await nameEls[i].getText().then((text) => Promise.resolve(text));
    let id = i + 1;
    team.name = name;
    team.id = id;
    teams.push(team);
  }

  return teams;
}

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
