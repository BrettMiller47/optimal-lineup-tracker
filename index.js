import { getTeams } from './utils/getTeams.js';
import { getWeeklyData } from './utils/getWeeklyData.js';

const seasonId = '2022';
const leagueId = 84532749;
const weeksWithData = 2;
let teams = await getTeams(leagueId, seasonId);

async function getDataByWeek(seasonId, leagueId, teams, weeksWithData) {

  // Loop through 'weeksWithData' to populate 'dataByWeek' (an array of 'weeklyData' arrays)
  let dataByWeek = [];
  for (let week = 1; week < weeksWithData + 1; week++) {
    
    // Loop through 'teams' to populate this week's 'weeklyData' -- [{teamId: , data:}, {teamId: , data:}, ...]
    let weeklyData = [];
    for (let team in teams) {
      let teamId = teams[team].teamId;
      let teamData = await getWeeklyData(seasonId, teamId, leagueId, week);
      weeklyData.push({ teamId: teamId, data: teamData });
    }

    // Push the 'weeklyData' to 'dataByWeek'
    dataByWeek.push(weeklyData);
  }

  return dataByWeek;
}

let dataByWeek = await getDataByWeek(seasonId, leagueId, teams, weeksWithData);

for (let week in dataByWeek) {
  let weeklyData = dataByWeek[week]; 

  for (let team in weeklyData) {
    let teamId = weeklyData[team].teamId;
    let teamsIdx = teams.findIndex((item) => item.teamId === teamId);
    let name = teams[teamsIdx].name;
    let rawLineup = weeklyData[team].data;
  }
}
