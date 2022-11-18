const { Player, Lineup, Team, League } = require('../models');

const resolvers = {
  Query: {
    players: async () => {
      return await Player.find(); 
    },

    player: async (parent, args) => {
      return await Player.findOne({ _id: args.id });
    },

    lineups: async () => {
      return await Lineup.find().populate('players');
    },

    teams: async () => {
      return await Team.find().populate({
        path: 'startingLineups',
        populate: 'players'
      }).populate({
        path: 'optimalLineups',
        populate: 'players'
      });
    },

    leagues: async () => {
      return await League.find().populate({
        path: 'teams',
        populate: {
          path: 'startingLineups',
          populate: 'players'
        }
      }).populate({
        path: 'teams',
        populate: {
          path: 'optimalLineups',
          populate: 'players'
        }
      });
    }
  },

  // Mutation: {
  //   addTeam: async (parent, { name, id, totalActual, totalOptimal, totalDeficit, perfectWeeks}) => {
  //     return Team.create({ name, id, totalActual, totalOptimal, totalDeficit, perfectWeeks});
  //   },
  // },
};

module.exports = resolvers;
