import React from 'react';
import {Container, Row, Col } from 'react-bootstrap' 
import Table from 'react-bootstrap/Table';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WeeklySummary(props) {
  
  const styles = {
    divider: {
      borderBottom: '3px solid black',
      marginTop: '1.5rem',
      marginBottom: '1.5rem'
    }
  }

  const idxLineups = props.week - 1;
  const teamsCopy = [...props.teams];
  const sortedTeams = teamsCopy.sort((a, b) =>
    (a.optimalTotals[idxLineups] - a.startingTotals[idxLineups]) - 
    (b.optimalTotals[idxLineups] - b.startingTotals[idxLineups]));

  const samplePlayers = sortedTeams[0].startingLineups[0].players;
  const positionOrder = samplePlayers.map((player) => player.SLOT);
  
  return (
    <>
      {/* Create a row for each team */}
      {sortedTeams.map((team, i)=>
        <div key={i}>
          {/* Divider for teams */}
          <Row className='d-flex justify-content-center flex-wrap'>
            <Col xs={9} style={styles.divider}>
            </Col>
          </Row>
          

          <Container fluid>
            <Row className='d-flex justify-content-center'>

              {/* Col for Weekly summary */}
              <Col xs={12} lg={4} className='p-5'>
                <Row >
                  <Col xs={6} sm={12}>
                    <h1 className='text-center'>{team.name}</h1>
                  </Col>
                  <Col xs={6} sm={12}>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Actual Points:</td>
                          <td>{(team.startingTotals[idxLineups]).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Potential Points:</td>
                          <td>{(team.optimalTotals[idxLineups]).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Start/Sit Deficit:</td>
                          <td>{(team.startingTotals[idxLineups] - team.optimalTotals[idxLineups]).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs={6} sm={12} className='text-center'>
                    {+((team.startingTotals[idxLineups] - team.optimalTotals[idxLineups]).toFixed(2)) === 0 ? (
                      <h1>⭐</h1>
                    ) :
                      <h1> </h1> 
                    }
                  </Col>
                </Row>
              </Col>

              {/* Col for Actual */}
              <Col xs={12} lg={4} className='d-flex justify-content-center'>
                <Card lineup={team.startingLineups[idxLineups]} positionOrder={positionOrder} />
              </Col>

              {/* Col for Optimal */}
              <Col xs={12} lg={4} className='d-flex justify-content-center'>
                <Card lineup={team.optimalLineups[idxLineups]} positionOrder={positionOrder} />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}
