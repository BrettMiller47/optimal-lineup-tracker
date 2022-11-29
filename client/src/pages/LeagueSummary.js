import React, {useState} from 'react';
import SeasonSummary from '../components/SeasonSummary';
import WeeklySummary from '../components/WeeklySummary';
import SeasonSummary2 from '../components/SeasonSummary2';
import Spinner from 'react-bootstrap/Spinner';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_LEAGUE } from '../utils/queries';

export default function LeagueSummary() {

  // Get the 'leagueId' from localStorage
  const leagueIdStr = localStorage.getItem('leagueId');
  const leagueId = parseInt(leagueIdStr);

  // Query the league's data from the db (returns a JSON object 'data')
  const { loading, data } = useQuery(QUERY_SINGLE_LEAGUE, {
    variables: {leagueId: leagueId}
  });
  const teams = data?.league.teams || [];
  console.log('teams')
  console.log(teams);

  // Declare a state variable to track the week for the 'weeklySummary' component
  // const [week, setWeek] = useState(data.league.teams.startingLineups.length + 1);
  // const handleWeekChange = () => {
  //   console.log('handling week change');
  // };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <div>
          <SeasonSummary2 teams={teams} />
          <WeeklySummary teams={teams} />        
        </div>
      )}
    </>
  );
}