const db = require('../config/connection');
const { Team, League, Player, Lineup } = require('../models');

const leagueSeeds = require('./leagueSeeds.json');
const teamSeeds = require('./teamSeeds.json');
const lineupSeeds = require('./lineupSeeds.json');
const playerSeeds = require('./playerSeeds.json');

db.once('open', async () => {
  try {
    
    // Clear previous db data
    await League.deleteMany({});
    await Team.deleteMany({});
    await Lineup.deleteMany({});
    await Player.deleteMany({});

    await League.create(leagueSeeds);
    await Team.create(teamSeeds);
    await Lineup.create(lineupSeeds);
    await Player.create(playerSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
