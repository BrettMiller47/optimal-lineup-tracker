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
    console.log(teams);

    // Navigate to the Schedule page
    await driver.get(`https://fantasy.espn.com/football/league/schedule?leagueId=${leagueId}`);

    // Team icons load last, so wait for icons to ensure the page is fully loaded
    await waitForIconsToLoad(driver);

    // Get the 'weeklyMatchups' that have data
    let weeklyMatchups = await getWeeklyMatchups(driver);

    // Get the 'boxScoreUrls'
    let boxScoreUrls = getBoxScoreUrls(teams, weeklyMatchups, leagueId, seasonId);

    // Populate the blank 'rawLineups' arrays in 'teams'
    await populateRawLineups(driver, boxScoreUrls, teams);
    
    // // ? console logging
    // for (let i = 0; i < weeklyMatchups.length; i++){
    //   console.log('\n\n');
    //   console.log(`Week ${i + 1}`);
      
    //   console.log(weeklyMatchups[i]);
    // }


    // return weeklyData;
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

    // Declare the 'name', 'id', and 'rawLineups' keys for the 'team'
    let name = await nameEls[i].getText().then((text) => Promise.resolve(text));
    let id = i + 1;
    team.name = name;
    team.id = id;
    team.rawLineups = [];

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

function getBoxScoreUrls(teams, weeklyMatchups, leagueId, seasonId) {
  
  // Loop through 'weeklyMatchups'
  let boxScoreUrls = [];
  for (let iWeek = 0; iWeek < weeklyMatchups.length; iWeek++) {
    
    // Loop through each 'matchup' in the week
    for (let iMatch = 0; iMatch < weeklyMatchups[iWeek].length; iMatch++) {
      
      // Get the homeTeam's id
      let homeTeam = weeklyMatchups[iWeek][iMatch].homeTeam;
      let homeTeamObj = teams.filter((team)=>team.name == homeTeam);
      let homeId = homeTeamObj[0].id;

      // Declare the matchup's 'boxScoreUrl'
      let boxScoreUrl = `https://fantasy.espn.com/football/boxscore?leagueId=${leagueId}&matchupPeriodId=${iWeek+1}&scoringPeriodId=${iWeek+1}&seasonId=${seasonId}&teamId=${homeId}&view=scoringperiod`
      boxScoreUrls.push(boxScoreUrl);
    }
  }
  return boxScoreUrls;
}

async function populateRawLineups(driver, boxScoreUrls, teams) {

  // Loop through the 'boxScoreUrls'
  for (let iUrl = 0; iUrl < 2; iUrl++){
    console.log(boxScoreUrls[iUrl]);
    await driver.get(boxScoreUrls[iUrl]);

    // Wait for the page to load
    await driver.wait(until.elementLocated(By.className('AnchorLink link clr-link pointer')), 15000);

    // Get the team names
    let names = []
    let nameEls = await driver.findElements(By.className('team-header'));
    await nameEls[0].getText().then((text) => {
      let headerText = text.split('\n');
      names.push(headerText[0]);
    });
    await nameEls[1].getText().then((text) => {
      let headerText = text.split('\n');
      names.push(headerText[0]);
    });

    // Loop through each table (two tables, one for each team)
    let tableEls = await driver.findElements(By.className('Table__TBODY'));
    for (let iTable = 0; iTable < tableEls.length; iTable++){

      // Loop through the table's players
      let players = [];
      let playerEls = await driver.findElements(By.className('Table__TR Table__TR--lg Table__odd'));
      for (let iPlayers = 0; iPlayers < playerEls.length; iPlayers++){

        // Get the 'player' from the playerEl
        let player = {};
        await playerEls[iPlayers].getText().then((text) => { 
          let stats = text.split('\n');

          // Ignore the 'TOTALS' row for each team
          if (stats[0] != 'TOTALS') {
            player.SLOT = stats[0];
            player.PLAYER = stats[1];
            player.TEAM = stats[2];
            player.POS = stats[3];
            player.OPP = stats[4];
            player.STATUS = stats[5];
            player.PROJ = stats[6];
            player.FPTS = stats[7];

            // Push 'player' to the team's 'players'
            players.push(player)
          }
        });
      }
      
      // Push 'players' to the appropriate team in 'teams'
      let name = names[iTable];
      teams.map((team) => {
        if (team.name == name) {
          team.rawLineups.push(players);
        }
      });
    }
  }
}
