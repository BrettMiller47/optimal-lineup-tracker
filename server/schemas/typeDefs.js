const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Team {
    name: String
    id: Int
    totalActual: Float
    totalOptimal: Float
    totalDeficit: Float
    perfectWeeks: Int
  }

  type Query {
    teams: [Team]!
    team(name: String!): Team
  }

  type Mutation {
    addTeam(name: String!, id: Int!, totalActual: Float!, totalOptimal: Float!, totalDeficit: Float!, perfectWeeks: Int!): Team
  }
`;

module.exports = typeDefs;
