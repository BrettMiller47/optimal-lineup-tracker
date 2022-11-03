import { getTeams } from './utils/getTeams.js';
import { getWeeklyData } from './utils/getWeeklyData.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 2;

let teams = await getTeams(leagueId, seasonId);

let dataByWeek = [];

// Get each team's teamId
for (let team in teams) {
  let teamId = teams[team].teamId;

  // Get each week's data for that team
  for (let week = 1; week < weeksWithData + 1; week++) {
    let weeklyData = await getWeeklyData(seasonId, teamId, leagueId, week);
    
    // Add the team's weekly data to dataByWeek
    dataByWeek.push({ teamId: teamId, data: weeklyData });
  }
}

console.log(dataByWeek);
