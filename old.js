const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

const leagueUrls = [
  { team: 'Plaxico Burress', leagueId: 84532749 }
]

var teamUrls = [];

const playerDataDesc = [
  'rosterPosition',
  'name',
  'health',
  'team',
  'DUPLICATE',
  'oppTeam',
  'gameTime',
  'projPts',
  'oppRank',
  'startPercent',
  'rosterPercent',
  'plusMinus',
  'positionRank',
  'totalPts',
  'avgPts',
  'prevPts'
]

function getActualNumTeams(num) {
  // If 'numTeams' >14, then
  // -- divisional standings must be removed from 'teamEls'
  if (num > 14) {
    // Since divisional standings account for double the teams, we halve numTeams
    return num / 2;
  } else {
    return num;
  }
}


// Example - https://fantasy.espn.com/football/team?leagueId=[leagueId]&teamId=[standing]&seasonId=[seasonId]
async function getTeamUrls(leagueUrls) {
  let urlBeginning = 'https://fantasy.espn.com/football/';
  let urlLeagueExt = 'league/standings?leagueId='
  let seasonId = '2022';
  let driver = await new Builder().forBrowser('chrome').build();
  // loop through the dictionary of {team: XXX, leagueId: ###}  
  for (let iUrls = 0; iUrls < leagueUrls.length; iUrls++) {
    try {

      // !-------- Get numTeams --------
      // Open the league standings page
      let leagueId = leagueUrls[iUrls]['leagueId'];
      let leagueUrl = `${urlBeginning}${urlLeagueExt}${leagueId}`;
      await driver.get(leagueUrl);

      // Wait for the standings table to load
      let classToFind = 'teamName truncate';
      await driver.wait(until.elementLocated(
        By.className(classToFind))
        , 15000
      );

      // find all teams (they appear in order of rank)
      let teamEls = await driver.findElements(By.className(classToFind));
      let fetchedNumTeams = teamEls.length;
      let actualNumTeams = getActualNumTeams(teamEls.length);
      

      // !-------- Get teamUrl --------
      let teamToFind = leagueUrls[iUrls]['team'];

      // Search for 'teamToFind'
      let rank = '';
      let iTeamsStart = fetchedNumTeams - actualNumTeams;
      // let rank = await getRank(teamToFind, teamEls[iTeams], iTeamsStart)
      for (let iTeams = iTeamsStart; iTeams < fetchedNumTeams; iTeams++) {
        await teamEls[iTeams].getText().then((text) => {
          console.log('Searching for: ' + teamToFind + ' and found: ' + text);
          if (text == teamToFind)
            rank = iTeams - actualNumTeams + 1;
        });
      }

      // Push the teamUrl to 'teamUrls'
      let urlTeamExt = 'team?leagueId='
      let teamUrl = `${urlBeginning}${urlTeamExt}${leagueId}&teamId=${rank}&seasonId=${seasonId}`
      teamUrls.push({ team: teamToFind, url: teamUrl });
      return teamUrls;

    } finally {
      await driver.quit();
    }
  }
}

async function getPlayers(url) {
  console.log(url);
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Open the team's page
    await driver.get(url);

    // Wait for the table to load
    let classToFind = 'Table__TR Table__TR--lg Table__odd';
    await driver.wait(until.elementLocated(
      By.className(classToFind))
      , 10000
    );

    // playerRowEls = [Position, Name, Team, DUPLICATE-Position, OppTeam, Day #:## PM, Proj, oppRank, startPercent, rosterPercent, plusMinus, positionRank, totalPts, avgPts, prevPts]
    let playerRowEls = await driver.findElements(By.className(classToFind));

    // Declare an array to hold allPlayers
    let allPlayers = [];

    // For each playerRowEl declare a player
    for (let i = 0; i < playerRowEls.length; i++) {
      let player = [];
      let counterTexts = 0;
      let counterText = 0;

      // Loop through the data points in the playerRowEl
      await playerRowEls[i].getText().then((stat) => {
        console.log('--------------------- should be new player');

        // TODO: push the stat to 'player'
        // If 'O' appears in index 2, then set the status to Out
        if (stat != 'O' || stat != 'D' || stat != 'Q' || stat != 'IR') {
          console.log(stat);
          player.push('Healthy');
          counterText++;
        }
        // If this is the 'TOTALS' row's starting point 
        else if ((stat != 'TOTALS')) {
          // Ignore the ROW by increasing the number of columns in the ignorable ROW
          let numTotalRowColumns = 6;
          counterText += numTotalRowColumns;
        } else {
          // Add the text to player[]
          player.push(stat);
          counterText++
        }
        // console.log(player);
      });
      // allPlayers.push(player);
    }
    return allPlayers;
  } finally {
    await driver.quit();
  }
};


async function getAllTeamData() {

  const teamUrls = await getTeamUrls(leagueUrls);
  let allTeamData = []
  for (let i = 0; i < teamUrls.length; i++) {
    let teamUrl = teamUrls[i]['url'];
    const playerData = await getPlayers(teamUrl);
    console.log('playerData ------ ' + playerData);
    allTeamData.push({ team: teamUrls[i]['team'], data: playerData })
  }
  console.log('--------------------------');
  console.table(allTeamData);
}
getAllTeamData();