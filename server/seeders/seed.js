const db = require('../config/connection');
const { Team, League, Player, Lineup } = require('../models');

const leagueSeeds = require('./leagueSeeds.json');
const teamSeeds = require('./teamSeeds.json');
const lineupSeeds = require('./lineupSeeds.json');
const playerSeeds = require('./playerSeeds.json');

const sortedSeeds = require('./sorted.json');
const { getStartingLineup, getTotal, getOptimalStartingLineup } = require('./lineupOptimizer');

db.once('open', async () => {
  try {
    
    // Clear previous db data
    await League.deleteMany({});
    await Team.deleteMany({});
    await Lineup.deleteMany({});
    await Player.deleteMany({});

    // Populate db models
    // const leagues = await League.create(leagueSeeds);
    // const teams = await Team.create(teamSeeds);
    // const lineups = await Lineup.create(lineupSeeds);
    // const players = await Player.create(playerSeeds);

    // ! incorporate scrape.js to truly populate these for each team in the league
    // // Add players to lineup
    // let numRawLineupPlayers = 15;
    // for (let i = 0; i < numRawLineupPlayers; i++) {
    //   let newPlayerId = players[i]._id;
      
    //   // raw
    //   for (let j = 0; j < lineups.length; j++){
    //     const tempLineup = lineups[j];

    //     tempLineup.players.push(newPlayerId);
    //     await tempLineup.save();
    //   }

    //   // actual

    //   // optimal
    // }
    
    // Add lineups to teams


    // Add teams to leagues

    // -------------
    // For each team, populate the raw, actual, and optimal lineups
    for (let iTeam = 0; iTeam < sortedSeeds.length; iTeam++){
      let team = sortedSeeds[iTeam];
      let teamDoc = await Team.create({
        "name": team.name,
        "id": team.id,
        "totalActual": team.totalActual,
        "totalOptimal": team.totalOptimal,
        "totalDeficit": team.totalDeficit,
        "perfectWeeks": team.perfectWeeks
      });

      // Loop through the team's raw lineups...
      for (let iRaw = 0; iRaw < team.rawLineups.length; iRaw++){
        let week = iRaw + 1;
        let rawLineup = team.rawLineups[iRaw];
        // ! connect with helper functions
        let actualLineup = getStartingLineup(rawLineup);
        console.log(week);
        let optimalLineup = getOptimalStartingLineup(rawLineup);
        let actualFPTS = Math.round(getTotal(actualLineup)*100)/100;
        let optimalFPTS = Math.round(getTotal(optimalLineup)*100)/100;
        let deficit = actualFPTS - optimalFPTS;
        let lineupsDoc = await Lineup.create(
          {
            "week": week,
            "totalFPTS": actualFPTS
          }
        );        
      }
    }
    // -------------


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});


        // // Loop through the lineup's players
        // for (let iPlayer = 0; iPlayer < rawLineup.length; iPlayer++){
        //   let player = rawLineup[iPlayer];

        //   // Add the player to the database
        //   let playerDb = await Player.create(player);
        // }
