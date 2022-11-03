import { getTeams } from './utils/getTeams.js';
import { getWeeklyData } from './utils/getWeeklyData.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 2;

// let teams = await getTeams(leagueId, seasonId);

let teamId = 2;
let allWeeksData = [];
// For all weeks with data...
for (let week = 1; week < weeksWithData + 1; week++) {
  let weeklyData = await getWeeklyData(seasonId, teamId, leagueId, week);
  allWeeksData.push({ teamId: teamId, data: weeklyData });
}
