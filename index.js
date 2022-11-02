import { getBoxscores } from './boxscores.js';
import {getTeams} from './teams.js';

const seasonId = '2022';
const leagueId = 84532749;

let teams = getTeams(leagueId, seasonId);
getBoxscores(leagueId, seasonId, teams);
