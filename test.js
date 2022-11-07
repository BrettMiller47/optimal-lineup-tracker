import { getTeams } from './utils/getTeams.js';
import { getDataByWeek } from './utils/getDataByWeek.js';
import { getActualStartingLineup, getOptimalStartingLineup, getTotal } from './utils/lineupOptimizer.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 8;
let teams = await getTeams(leagueId, seasonId, weeksWithData);
console.table(teams);
