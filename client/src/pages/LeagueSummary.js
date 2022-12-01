import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap' 
import SeasonSummary from '../components/SeasonSummary';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import WeeklySummary from '../components/WeeklySummary';
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

  const [week, setWeek] = useState(1);
  const handleWeekSelection = (e) => {
    setWeek(e);
  };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <div>
          <SeasonSummary teams={teams} />
          
          {/* Weekly Dropdown Selector */}
          <Container className='d-flex'>
            <Row className='d-flex p-2 align-items-center'>
              <DropdownButton onSelect={handleWeekSelection} id="weekDropdown" title="Week" variant='secondary'>
                {teams[0].startingLineups.map((week, i) => 
                  <Dropdown.Item eventKey={i+1} key={i}>Week {i+1}</Dropdown.Item>      
                )}
              </DropdownButton>
            </Row>
            <Row className='d-flex p-2 align-items-center'>
              <h5>{week}</h5>
            </Row>
          </Container>

          <WeeklySummary teams={teams} week={week} />        
        </div>
      )}
    </>
  );
}