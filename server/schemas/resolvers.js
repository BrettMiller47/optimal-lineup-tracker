const { Player, Lineup, Team, League } = require('../models');

const resolvers = {
  Query: {
    players: async () => {
      return await Player.find();
    },

    player: async (parent, args) => {
      return await Player.findById(args.id);
    },

    lineups: async () => {
      return await Lineup.find().populate('players');
    },

    teams: async () => {
      return await Team.find().populate('lineups');
    },

    leagues: async () => {
      return await League.find().populate('teams');
    }
  },

  // Mutation: {
  //   addTeam: async (parent, { name, id, totalActual, totalOptimal, totalDeficit, perfectWeeks}) => {
  //     return Team.create({ name, id, totalActual, totalOptimal, totalDeficit, perfectWeeks});
  //   },
  // },
};

module.exports = resolvers;
