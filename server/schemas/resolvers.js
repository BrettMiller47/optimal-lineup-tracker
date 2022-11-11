const { Team } = require('../models');

const resolvers = {
  Query: {
    teams: async () => {
      return Team.find();
    },

    team: async (parent, { name }) => {
      return Team.findOne({ name: name });
    },
  },

  Mutation: {
    addTeam: async (parent, { name, id, totalActual, totalOptimal, totalDeficit, perfectWeeks}) => {
      return Team.create({ name, id, totalActual, totalOptimal, totalDeficit, perfectWeeks});
    },
  },
};

module.exports = resolvers;
