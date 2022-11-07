import { getTeams } from './utils/getTeams.js';
import { getStartingLineup, getOptimalStartingLineup, getTotal } from './utils/lineupOptimizer.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 2;

// Step 1) Get the teams' data
let teams = await getTeams(leagueId, seasonId, weeksWithData);

// Step 2) Get the starting and optimal lineups
let teamsStarting = pushStartingLineups(teams);
let teamsOptimal = pushOptimalLineups(teamsStarting);

// !Step 3) Get the totals & deficit data from the lineups

// ------------------------------------------------------------

function pushTotals(teams){}



// ------------------------------------------------------------

// Step 4) Sort 'teams' by 'totalFromOptimal'
// let sorted = teams.sort((a, b) => (a.totalFromOptimal > b.totalFromOptimal) ? 1 : -1);
// console.table(sorted);

// Step 3) Get the cumulative pointsFromOptimal by team
// for (let team in teams) {
//   teams[team].totalActual = 0;
//   teams[team].totalOptimal = 0;
//   teams[team].totalFromOptimal = 0;
  
//   for (let week in dataByWeek) {
//     let weeklyData = dataByWeek[week];

//     for (let i in weeklyData) {
//       let isTeamInTeams = teams[team].teamId === weeklyData[i].teamId;
//       if (isTeamInTeams) {
//         teams[team].totalActual += Number(weeklyData[i].actualScore);
//         teams[team].totalOptimal += Number(weeklyData[i].optimalScore);
//         teams[team].totalFromOptimal += Number(weeklyData[i].pointsFromOptimal);
//       }
//     }
//   }
// }

function pushStartingLineups(teams) {
  
  // Loop through each team
  for (let team in teams) {
    let startingLineups = [];
  
    // Loop through the team's weeks of data to populate 'optimalLineups'...
    for (let i = 0; i < weeksWithData; i++) {
      // Get the team's optimal lineup for that week
      let rawLineup = teams[team].dataByWeek[i];
      let startingLineup = getStartingLineup(rawLineup);

      // Push the 'optimalLineup' to the array of 'optimalLineups'
      startingLineups.push(startingLineup);
    }
    // Push the 'optimalLineups' for the team to 'teams[team]'
    teams[team].startingLineups = startingLineups;
  }

  return teams;
}

function pushOptimalLineups(teams) {
  
  // Loop through each team
  for (let team in teams) {
    let optimalLineups = [];
  
    // Loop through the team's weeks of data to populate 'optimalLineups'...
    for (let i = 0; i < weeksWithData; i++) {
      // Get the team's optimal lineup for that week
      let rawLineup = teams[team].dataByWeek[i];
      let optimalLineup = getOptimalStartingLineup(rawLineup);

      // Push the 'optimalLineup' to the array of 'optimalLineups'
      optimalLineups.push(optimalLineup);
    }
    // Push the 'optimalLineups' for the team to 'teams[team]'
    teams[team].optimalLineups = optimalLineups;
  }

  return teams;
}