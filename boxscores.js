import { Builder, By, until } from 'selenium-webdriver';
import 'chromedriver';


export async function getWeeklyData(seasonId, teamId, leagueId, lastWeekWithScores, teams) {
  
  // Build the driver for navigating the url via Chrome
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // TODO: for loop through all previous weeks
    const week = 1;

    // Navigate to the team's weekly scores
    let weeklyScoreUrl = `https://fantasy.espn.com/football/team?seasonId=${seasonId}&leagueId=${leagueId}&teamId=${teamId}&scoringPeriodId=${week}&statSplit=singleScoringPeriod`
    await driver.get(weeklyScoreUrl);

    // Wait for the players table to load
    await driver.wait(until.elementLocated(
      By.className('Table__sub-header Table__TR Table__even'))
      , 15000
    );

    // Get the table headers
    let headerEls = await driver.findElement(By.className('Table__sub-header Table__TR Table__even'));
    let headers = await headerEls.getText().then((text) =>
      Promise.resolve(text.split('\n'))      
    );

    // Get all playerRowEls
    let playerRowEls = await driver.findElements(By.className('Table__TR Table__TR--lg Table__odd'));

    // For each playerRowEl get the player's stats and push to 'playersData'
    let playersData = []
    for (let i = 0; i < playerRowEls.length; i++) {

      // Loop through the data points in the playerRowEl
      await playerRowEls[i].getText().then((text) => {
        let stats = text.split('\n');
        playersData.push(stats);
      });
    }
    
    // ! For each player..
    // for (let player in playersData) {

      // Handle the following issues:
      // 1) -- HEALTH @ playersData[2] but not in headers
      // 2) -- TEAM @ playersData[2] (or [3] if HEALTH) but not in headers
      // 3) -- POS @ playersData[3] (or [4] if HEALTH) but not in headers

      // TODO Handle Issue 1: add 'HEALTH' as headers[2]
      // TODO Handle Issue 2: add 'TEAM' as headers[2] (or [3] if HEALTH)
      // TODO Handle Issue 3: add 'POS' as headers[3] (or [4] if HEALTH)
    // }
    console.log(headers);
    console.log(playersData);
    // console.log(allPlayers);
    // return allPlayers;


  } finally {
    await driver.quit();
  }
}
getWeeklyData(2022, 2, 84532749, 8, 'teams');