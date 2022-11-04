import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';

function getActualNumTeams(num) {
  // If 'numTeams' >14, then
  // -- divisional standings must be removed from 'teamEls'
  if (num > 14) {
    // Since divisional standings account for double the teams, we halve numTeams
    return num / 2;
  } else {
    return num;
  }
};

export async function getTeams(leagueId, seasonId) {
  
  // Build the driver for navigating the url via Chrome
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to the league standings
    let leagueUrl = `https://fantasy.espn.com/football/league/standings?leagueId=${leagueId}`
    await driver.get(leagueUrl);

    // Wait for the standings table to load
    let classToFind = 'teamName truncate';
    await driver.wait(until.elementLocated(
      By.className(classToFind))
      , 15000
    );

    // Get all teamIds -- [{teamName: teamId}]
    let teamEls = await driver.findElements(By.className(classToFind));

    // Handle/ignore rankings by division
    let fetchedNumTeams = teamEls.length;
    let actualNumTeams = getActualNumTeams(teamEls.length);
    let iTeamsStart = fetchedNumTeams - actualNumTeams;
    
    // Get the rankings
    let rankings = [];
    for (let iTeamEls = iTeamsStart; iTeamEls < fetchedNumTeams; iTeamEls++) {
      let name = await teamEls[iTeamEls].getText().then((name) => Promise.resolve(name));
      rankings.push(name);
    }

    // Loop through each team's individual page
    let teams = [];
    for (let iTeams = 0; iTeams < actualNumTeams; iTeams++) {

      // Get the team url
      let teamId = iTeams + 1;
      let teamUrl = `https://fantasy.espn.com/football/team?leagueId=${leagueId}&teamId=${teamId}&seasonId=${seasonId}`;
      await driver.get(teamUrl);
      
      // Wait until the page has loaded
      await driver.wait(until.elementLocated(
        By.className(classToFind))
        , 15000
      );

      // Get teamName
      let teamEl = await driver.findElement(By.className(classToFind));
      let name = await teamEl.getText().then((name) => Promise.resolve(name));

      // Append rank, teamName, teamId, and teamUrl to 'teamsData'
      teams.push({ name: name, teamId: teamId });
    }

    // Loop through the rankings
    for (let iRank = 0; iRank < rankings.length; iRank++) {
      let rankTeam = rankings[iRank];

      // Find the team (from rankings) in 'teams'
      for (let iTeams in teams) {
        let teamsTeam = teams[iTeams].name;
        
        // If the currently indexed ranked team is currently indexed in 'teams'
        if (rankTeam == teamsTeam) {
          // Add the ranking to 'teams'
          teams[iTeams].rank = iRank + 1;
        }
      }
    }
    return teams;
  } finally {
    await driver.quit();
  }
};
