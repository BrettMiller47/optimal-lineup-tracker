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
    await waitForIconsToLoad(driver);

    // Get an array of 'teams' where team = {id: , name:}
    let teams = await getIdsAndNames(driver);

    // Navigate to the Schedule page
    await driver.get(`https://fantasy.espn.com/football/league/schedule?leagueId=${leagueId}`);

    // Team icons load last, so wait for icons to ensure the page is fully loaded
    await waitForIconsToLoad(driver);

    // Get the 'weeklyMatchups' with data
    let weeklyMatchups = await getWeeklyMatchups(driver);
    
    // ? console logging
    for (let i = 0; i < weeklyMatchups.length; i++){
      console.log('\n\n');
      console.log(`Week ${i + 1}`);
      
      console.log(weeklyMatchups[i]);
    }

  } finally {
    await driver.quit();
  }
};

// ----------------------------------
// -------- HELPER FUNCTIONS --------

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

async function waitForIconsToLoad(driver) {
  let teamIconClass = 'Image team-logo w-100';
  let customTeamIconClass = 'Image team-logo w-100';
  try {
    // Find a standard icon
    await driver.wait(until.elementLocated(By.className(teamIconClass)), 15000);
  } catch {
    // Find a custom icon
    await driver.wait(until.elementLocated(By.className(customTeamIconClass)), 15000);
  }
}

function getMatchupDetails(arr) {

  // arr = [homeTeam, homeRecord, homeManager, homeScore, awayScore, awayManager, awayTeam, awayRecord]
  // If (homeScore == 0 && awayScore == 0), then this matchup is yet to be played
  if (arr[3] == 0 && arr[4] == 0) {
    return -1;
  } else if (arr.length != 8) {
    return -2;
  } else {
    
    // Return an array = [homeTeam, homeScore, awayTeam, awayScore]
    let matchupDetails = {
      homeTeam: arr[0],
      homeScore: arr[3],
      awayTeam: arr[6],
      awayScore: arr[4]
    };
    return matchupDetails;
  }
}

async function getWeeklyMatchups(driver) {
  
  // Get the matchup tables for the weeks with data
  let regTables = await driver.findElements(By.className('ResponsiveTable'));
  
  // Loop through each week's table...
  let weeklyMatchups = [];
  for (let iTable = 0; iTable < regTables.length; iTable++){
    
    // Loop through each matchupEl in the table to populate 'matchupsInWeek'
    let matchupsInWeek = []
    let matchupEls = await regTables[iTable].findElements(By.className('Table__TR Table__TR--md Table__odd'));
    for (let iMatch = 0; iMatch < matchupEls.length; iMatch++){

      // Get the matchup's 'detailsArr' from the matchupEl
      await matchupEls[iMatch].getText().then((text) => {
        let detailsArr = text.split('\n');

        // Use a helper function to return a 'matchup' object given the 'detailsArr'
        let matchup = getMatchupDetails(detailsArr);

        // If 'matchup' is not an error code due to lack of score data...
        if (matchup != -1 && matchup != -2) {
          matchupsInWeek.push(matchup);
        }
      });
    }

    // If 'matchupsInWeek' contains data (i.e this week has score data), then push to 'weeklyMatchups'
    if (0 < matchupsInWeek.length) {
      weeklyMatchups.push(matchupsInWeek);      
    }
  }

  return weeklyMatchups;
}