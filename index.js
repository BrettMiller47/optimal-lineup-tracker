import { getTeams } from './utils/getTeams.js';
import { getWeeklyData } from './utils/getWeeklyData.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 8;

// let teams = await getTeams(leagueId, seasonId);

let weeklyData = await getWeeklyData(seasonId, 2, leagueId, 3);
console.log(weeklyData);