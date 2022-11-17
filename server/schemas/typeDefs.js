const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Player {
    _id: ID
    SLOT: String
    PLAYER: String
    TEAM: String
    POS: String
    OPP: String
    STATUS: String
    PROJ: String
    FPTS: String
  }

  type Lineup {
    week: Int
    players: [Player]
    totalFPTS: Float
  }

  type Team {
    name: String
    id: Int
    startingLineups: [Lineup]
    optimalLineups: [Lineup]
    totalActual: Float
    totalOptimal: Float
    totalDeficit: Float
    perfectWeeks: String
  }

  type League {
    id: Int
    teams: [Team]
  }

  type Query {
    players: [Player]!
    player(id: ID!): Player
    lineups: [Lineup]!
    teams: [Team]!
    leagues: [League]!
  }
`;

module.exports = typeDefs;
