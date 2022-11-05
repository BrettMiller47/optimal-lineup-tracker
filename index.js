import { getTeams } from './utils/getTeams.js';
import { getWeeklyRawLineup } from './utils/getWeeklyRawLineup.js';
import { getActualStartingLineup, getOptimalStartingLineup, getTotal } from './utils/lineupOptimizer.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 8;
let teams = await getTeams(leagueId, seasonId);

// Step 1) Get the raw 'dataByWeek'
let dataByWeek = await getDataByWeek(seasonId, leagueId, teams, weeksWithData);

// Step 2) Optimize the raw 'dataByWeek' and return the weeks sorted by 
let optimizedDataByWeek = optimizeDataByWeek(dataByWeek);

// Step 3) Get the cumulative pointsFromOptimal by team
for (let team in teams) {
  teams[team].totalActual = 0;
  teams[team].totalOptimal = 0;
  teams[team].totalFromOptimal = 0;
  
  for (let week in dataByWeek) {
    let weeklyData = dataByWeek[week];

    for (let i in weeklyData) {
      let isTeamInTeams = teams[team].teamId === weeklyData[i].teamId;
      if (isTeamInTeams) {
        teams[team].totalActual += Number(weeklyData[i].actualScore);
        teams[team].totalOptimal += Number(weeklyData[i].optimalScore);
        teams[team].totalFromOptimal += Number(weeklyData[i].pointsFromOptimal);
      }
    }
  }
}

// Step 4) Sort 'teams' by 'totalFromOptimal'
let sorted = teams.sort((a, b) => (a.totalFromOptimal > b.totalFromOptimal) ? 1 : -1);
console.table(sorted);
// Step 5) Get the most recent week's pointsFromOptimal by team

// Function to retrieve 'dataByWeek'
async function getDataByWeek(seasonId, leagueId, teams, weeksWithData) {

  // Loop through 'weeksWithData' to populate 'dataByWeek' (an array of 'weeklyData' arrays)
  let dataByWeek = [];
  for (let week = 1; week < weeksWithData + 1; week++) {
    
    // Loop through 'teams' to populate this week's 'weeklyData' -- [{teamId: , data:}, {teamId: , data:}, ...]
    let weeklyData = [];
    for (let team in teams) {
      let teamId = teams[team].teamId;
      let rawLineup = await getWeeklyRawLineup(seasonId, teamId, leagueId, week);
      weeklyData.push({ teamId: teamId, rawLineup: rawLineup });
    }

    // Push the 'weeklyData' to 'dataByWeek'
    dataByWeek.push(weeklyData);
  }

  return dataByWeek;
}

// Function to update 'weeklyData' with newly added info:
// -- name
// -- actualStartingLineup & optimalStartingLineup
// -- actualScore & optimalScore
// -- pointsFromOptimal
function optimizeWeeklyData(weeklyData, teams) {
  
  for (let team in weeklyData) {
    
    // Get and add the team name
    let teamId = weeklyData[team].teamId;
    let teamsIdx = teams.findIndex((item) => item.teamId === teamId);
    let name = teams[teamsIdx].name;
    weeklyData[team].name = name;

    // Get the 'rawLineup' (includes bench players)
    let rawLineup = weeklyData[team].rawLineup;

    // Get ''actualStartingLineup' & 'optimalStartingLineup'
    let actualStartingLineup = getActualStartingLineup(rawLineup);
    let optimalStartingLineup = getOptimalStartingLineup(rawLineup);

    // Get 'actualScore' & 'optimalScore'
    let actualScore = getTotal(actualStartingLineup);
    let optimalScore = getTotal(optimalStartingLineup);
    let pointsFromOptimal = (optimalScore - actualScore).toFixed(2)

    // Push the new info to 'weeklyData' as new key: value pairs
    weeklyData[team].actualStartingLineup = actualStartingLineup;
    weeklyData[team].optimalStartingLineup = optimalStartingLineup;
    weeklyData[team].actualScore = actualScore;
    weeklyData[team].optimalScore = optimalScore;
    weeklyData[team].pointsFromOptimal = pointsFromOptimal;
  }

  return weeklyData;
}

// Function to update 'dataByWeek'
function optimizeDataByWeek(dataByWeek) {
  
  for (let week in dataByWeek) {
    // Get the 'optimizedWeeklyData'
    let weeklyData = dataByWeek[week]; 
    let optimizedWeeklyData = optimizeWeeklyData(weeklyData, teams);

    // Replace the weeklyData with the optimizedWeeklyData
    dataByWeek[week] = optimizedWeeklyData;
  }

  return dataByWeek;
}