import { gql } from '@apollo/client';

export const QUERY_SINGLE_LEAGUE = gql`
  query Query($leagueId: Int) {
    league(id: $leagueId) {
      teams {
        name
        optimalLineups {
          players {
            FPTS
            OPP
            PLAYER
            POS
            PROJ
            SLOT
            STATUS
            TEAM
          }
          totalFPTS
          week
        }
        perfectWeeks
        startingLineups {
          players {
            FPTS
            OPP
            PLAYER
            POS
            PROJ
            SLOT
            STATUS
            TEAM
          }
          totalFPTS
          week
        }
        totalActual
        totalDeficit
        totalOptimal
      }
    }
  }
`;

export const QUERY_TEAMS = gql`
  query Team {
    teams {
      name
      optimalLineups {
        week
        totalFPTS
        players {
          FPTS
          OPP
          PLAYER
          POS
          PROJ
          SLOT
          STATUS
          TEAM
        }
      }
      perfectWeeks
      startingLineups {
        week
        totalFPTS
        players {
          FPTS
          OPP
          PLAYER
          POS
          PROJ
          SLOT
          STATUS
          TEAM
        }
      }
      totalActual
      totalDeficit
      totalOptimal
    }
  }
`;

export const QUERY_SINGLE_TEAM = gql`
  query Team($teamId: ID!) {
    team(id: $teamId) {
      name
      optimalLineups {
        week
        totalFPTS
        players {
          FPTS
          OPP
          PLAYER
          POS
          PROJ
          SLOT
          STATUS
          TEAM
        }
      }
      perfectWeeks
      startingLineups {
        week
        totalFPTS
        players {
          FPTS
          OPP
          PLAYER
          POS
          PROJ
          SLOT
          STATUS
          TEAM
        }
      }
      totalActual
      totalDeficit
      totalOptimal
    }
  }
`;
