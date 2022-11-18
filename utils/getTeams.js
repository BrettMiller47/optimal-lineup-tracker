import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';
import { getStartingLineup, getOptimalStartingLineup, getTotal } from './lineupOptimizer.js';

export async function getTeams(leagueId, seasonId) {
  
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

    // Get the 'weeklyMatchups' that have data
    let weeklyMatchups = await getWeeklyMatchups(driver);

    // Get the 'boxScoreUrls'
    let boxScoreUrls = getBoxScoreUrls(teams, weeklyMatchups, leagueId, seasonId);

    // Get the league's starting lineup slots
    let startingSlots = await getStartingSlots(driver, leagueId);

    // Populate the blank 'rawLineups' arrays in 'teams'
    await populateRawLineups(driver, boxScoreUrls, teams, startingSlots);

    // Populate the blank 'actualLineups' arrays in 'teams'
    await populateActualLineups(teams);
    
    // Populate the blank 'optimalLineups' arrays in 'teams'
    await populateOptimalLineups(teams);

    // Update 'teams' to include totals
    await populateTotals(teams);
    
    return teams;

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
    team.actualLineups = [];
    team.optimalLineups = [];
  
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

async function getStartingSlots(driver, leagueId) {

  // wait for table elements to load
  await driver.get(`https://fantasy.espn.com/football/league/settings?leagueId=${leagueId}`);
  await driver.wait(until.elementLocated(By.className('Table__TD')), 15000);

  // get table element with child element containing 'position'
  let tableEls = await driver.findElements(By.className('Table'));
  let iPosTable = 0;
  for (let iTable = 0; iTable < tableEls.length; iTable++) {
    let headerEls = await tableEls[iTable].findElements(By.className('Table__THEAD'));
    
    // Loop through all the tables associated headers
    for (let iHead = 0; iHead < headerEls.length; iHead++){
      
      // If the header contains the word 'POSITION'
      await headerEls[iHead].getText().then((text) => {
        if (text.match('POSITION') != null) {

          // Save this table's headers and index so we can grab the table's data
          iPosTable = iTable;
        }
      });
    }
  }

  // get the position table's rows
  let rowEls = await tableEls[iPosTable].findElements(By.className('data-table__row Table__TR Table__TR--sm Table__odd'));

  // Save each position in the starting lineup as an array 'startingSlots'
  let startingSlots = []
  for (let row in rowEls) {

    // rowData is in format: [Position, numStartersAtPosition, maxOnRoster]
    let rowData = await rowEls[row].getText().then((text) => text.split('\n'));

    // If the row's position has a slot in the starting lineup
    if (rowData[1] != '0') {
      let pos = rowData[0].match(/\(.+\)/)[0].replace('(', "").replace(')', "");
      let numSlots = Number(rowData[1]);

      // Add each slot to the 'startingSlots' array
      if (pos != 'BE' && pos != 'IR') {
        for (let i = 0; i < numSlots; i++) {
          startingSlots.push(pos);
        }
      }
    }
  }

  return startingSlots;
}

async function populateRawLineups(driver, boxScoreUrls, teams, startingSlots) {

  // Loop through the 'boxScoreUrls'
  for (let iUrl = 0; iUrl < boxScoreUrls.length; iUrl++){
    await driver.get(boxScoreUrls[iUrl]);

    // Wait for the player info to load
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
    await driver.wait(until.elementLocated(By.className('Table__TBODY')), 15000);
    let tableEls = await driver.findElements(By.className('Table__TBODY'));
    for (let iTable = 0; iTable < tableEls.length; iTable++){

      // Loop through the table's players
      let players = [];
      await driver.wait(until.elementLocated(By.className('Table__TR Table__TR--lg Table__odd')), 15000);
      let playerEls = await tableEls[iTable].findElements(By.className('Table__TR Table__TR--lg Table__odd'));
      for (let iPlayers = 0; iPlayers < playerEls.length; iPlayers++){

        // Get the 'player' from the playerEl
        let player = {};
        await playerEls[iPlayers].getText().then((text) => { 
          let stats = text.split('\n');

          // Ignore the 'TOTALS' row for each team
          if (stats[0] != 'TOTALS') {

            // Assign the SLOT based on 'startingSlots' to handle scraping error (wrong SLOT)
            if (iPlayers < startingSlots.length) {
              player.SLOT = startingSlots[iPlayers]
            } else {
              player.SLOT = 'BE'
            }

            // Identify conditions that require handling
            let isEmptyPlayer = (stats[1] == 'Empty');
            let isFreeAgent = (stats[2] == 'FA');
            let isPlayerWithAllData = (!isEmptyPlayer && !isFreeAgent);
            if (stats.length != 8 && !isEmptyPlayer && !isFreeAgent) {
              console.log("\nWOAH, THAT'S NOT GOOD");
              console.log(`stats are:`);
              for (let z in stats) {
                console.log(`stats[z] = ${stats[z]}`);
              }
            }
            
            // Populate the 'player' details
            if (isPlayerWithAllData) {
              player.PLAYER = stats[1];
              player.TEAM = stats[2];
              player.POS = stats[3];
              player.OPP = stats[4];
              player.STATUS = stats[5];
              player.PROJ = stats[6];
              player.FPTS = stats[7];

            } else if (isEmptyPlayer) {
              player.PLAYER = 'Empty';
              player.TEAM = '--';
              player.POS = '--';
              player.OPP = '--';
              player.STATUS = '--';
              player.PROJ = 0;
              player.FPTS = 0;
              
            } else if (isFreeAgent) {
              player.PLAYER = stats[1];
              player.TEAM = stats[2];
              player.POS = stats[3];
              player.OPP = stats[4];
              player.STATUS = '--';
              player.PROJ = stats[5];
              player.FPTS = stats[6];
            }

            // Push 'player' to the team's 'players'
            players.push(player)
          }
        });
      }

      // Try to flag a matchup that is incomplete
      try {
        await driver.findElement(By.className('statusValue fw-bold'));
        var isFlagged = true;
      } catch (NoSuchElementFound) {
        var isFlagged = false;
      }
      
      // Push 'players' to the appropriate team in 'teams'
      let name = names[iTable];
      teams.map((team) => {
        if (isFlagged) {
          team.rawLineups.push('FLAG');
        } else if (team.name == name) {
          team.rawLineups.push(players);
        }
      });
    }
  }
}

function populateActualLineups(teams) {
  
  // Loop through 'teams'
  for (let team in teams) {
    
    // Loop through the team's 'rawLineups'
    let actualLineups = [];
    for (let i = 0; i < teams[team].rawLineups.length; i++){
      let rawLineup = teams[team].rawLineups[i];

      if (rawLineup != 'FLAG') {
        
        // Push the 'actualLineup' to 'teams'
        let actualLineup = getStartingLineup(rawLineup);        
        teams[team].actualLineups.push(actualLineup);
      }
    }
  }
}

function populateOptimalLineups(teams) {
  
  // Loop through 'teams'
  for (let team in teams) {

    // Loop through the team's 'rawLineups'
    let optimalLineups = [];
    for (let i = 0; i < teams[team].rawLineups.length; i++) {
      let rawLineup = teams[team].rawLineups[i];

      if (rawLineup != 'FLAG') {

        // Push the 'optimalLineup' to 'teams'
        let optimalLineup = getOptimalStartingLineup(rawLineup);
        teams[team].optimalLineups.push(optimalLineup)
      }
    }
  }
}

function populateTotals(teams) {
  
  for (let team in teams) {
    
    let totalActual = 0;
    let totalOptimal = 0;
    let totalDeficit = 0;
    let perfectWeeks = '';
    let weeksWithData = teams[team].actualLineups.length;
    for (let i = 0; i < weeksWithData; i++){

      let actualStarters = teams[team].actualLineups[i];
      let weeklyActual = Math.round(getTotal(actualStarters) * 100) / 100;
      totalActual += weeklyActual;
      
      let optimalStarters = teams[team].optimalLineups[i];
      let weeklyOptimal = Math.round(getTotal(optimalStarters) * 100) / 100;
      totalOptimal += weeklyOptimal

      let weeklyDeficit = weeklyActual - weeklyOptimal;
      if (weeklyDeficit == 0) {
        perfectWeeks += `${i+1},`;
      } else if (i == 0) {
        perfectWeeks += ' ';
      } else {
        perfectWeeks += ', ';
      }
      totalDeficit += weeklyDeficit;
    }
    teams[team].totalActual = Math.round(totalActual * 100) / 100;
    teams[team].totalOptimal = Math.round(totalOptimal * 100) / 100;
    teams[team].totalDeficit = Math.round(totalDeficit * 100) / 100;
    teams[team].perfectWeeks = perfectWeeks;
  }

  return teams;
}