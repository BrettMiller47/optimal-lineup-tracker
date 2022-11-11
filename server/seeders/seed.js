const db = require('../config/connection');
const { Team } = require('../models');
const teamSeeds = require('./teamSeeds.json');

db.once('open', async () => {
  try {
    await Team.deleteMany({});
    await Team.create(teamSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
