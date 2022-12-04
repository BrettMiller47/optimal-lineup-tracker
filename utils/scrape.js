import * as fs from 'fs';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import { getTeams } from './getTeams.js';

// Step 1) Get the teams
export async function scrape(leagueId) {
  let teams = await getTeams(leagueId, '2022');

  // Step 2) Sort 'teamsTotal' by 'totalDeficit'
  let sorted = teams.sort((a, b) => (a.totalDeficit < b.totalDeficit) ? 1 : -1);

  // Step 3) Write the sorted teams to JSON format
  let data = JSON.stringify(sorted, null, 2);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  fs.writeFile(__dirname + '../seeders/sorted.json', data, err => {
    if (err) {
      throw err
    }
    console.log('JSON data is saved.')
  })
}
