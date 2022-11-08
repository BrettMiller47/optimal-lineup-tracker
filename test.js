import { getTeams } from './utils/getTeams.js';
import { getStartingLineup, getOptimalStartingLineup, getTotal } from './utils/lineupOptimizer.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 8;

let plaxicoWeekly = [
  133.75,
  140.4,
  126.7,
  94.6,
  152.8,
  117.1,
  100.2,
  121.7
]

let teams = await getTeams(leagueId, seasonId, weeksWithData);

// Step 2) Get the starting and optimal lineups
let teamsStarting = pushStartingLineups(teams);
let teamsOptimal = pushOptimalLineups(teamsStarting);

// Step 3) Get the totals & deficit data from the lineups
let teamsTotals = pushTotals(teamsOptimal);

// Step 4) Sort 'teamsTotal' by 'totalDeficit'
let sorted = teamsTotals.sort((a, b) => (a.totalDeficit > b.totalDeficit) ? 1 : -1);

let filtered = sorted.filter(item => item.name === 'Plaxico Burress');
console.table(filtered);


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

function pushTotals(teams) {
  
  for (let team in teams) {
    
    let totalActual = 0;
    let totalOptimal = 0;
    let totalDeficit = 0;
    for (let i = 0; i < weeksWithData; i++){

      let actualStarters = teams[team].startingLineups[i];
      let weeklyActual = Math.round(getTotal(actualStarters) * (10 ^ 2)) / (10 ^ 2);
      totalActual += weeklyActual;
      
      let optimalStarters = teams[team].optimalLineups[i];
      let weeklyOptimal = Math.round(getTotal(optimalStarters) * (10 ^ 2)) / (10 ^ 2);
      totalOptimal += weeklyOptimal

      let weeklyDeficit = weeklyOptimal - weeklyActual;
      totalDeficit += weeklyDeficit;
    }

    teams[team].totalActual = totalActual;
    teams[team].totalOptimal = totalOptimal;
    teams[team].totalDeficit = totalDeficit;
  }

  return teams;
}