// ! Testing Data Collection
import { getTeams2 } from './utils/getTeams2.js';

// Step 1) Get the teams
const seasonId = '2022';
const leagueId = 84532749;
let teams = await getTeams2(leagueId, seasonId);
console.log(teams)
