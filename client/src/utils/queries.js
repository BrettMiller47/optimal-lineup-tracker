import { gql } from '@apollo/client';

export const QUERY_SINGLE_LEAGUE = gql`
  query Query($leagueId: Int) {
    league(id: $leagueId) {
      teams {
        name
        id
        startingLineups {
          week
          players {
            SLOT
            PLAYER
            TEAM
            POS
            OPP
            STATUS
            PROJ
            FPTS
          }
          totalFPTS
        }
        startingTotals
        optimalLineups {
          week
          players {
            SLOT
            PLAYER
            TEAM
            POS
            OPP
            STATUS
            PROJ
            FPTS
          }
          totalFPTS
        }
        optimalTotals
        totalActual
        totalOptimal
        totalDeficit
        perfectWeeks
      }
    }
    }
`;