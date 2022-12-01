import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SeasonSummary(props) {
    
  const styles = {
    header: {
      borderBottom: '1px solid black',
      textAlign: 'center'
    },
    stars: {
      textAlign: 'right'
    },
    team: {
      fontWeight: 'bold'
    },
    deficit: {
      color: 'red',
      fontWeight: 'bold'
    }
  }

  return (
    <>
      <Table hover>
        <thead style={styles.header}>
          <tr>
            <th>Perfect Weeks</th>
            <th>Team</th>
            <th>Start/Sit Deficit</th>
            <th>Actual Points</th>
            <th>Potential Points</th>
          </tr>
        </thead>
        <tbody>
          {props.teams.map((team, i) => 
          <tr key={i}>
            <td style={styles.stars}>⭐</td> 
            <td style={styles.team}>{team.name}</td> 
            <td style={styles.deficit}>{team.totalDeficit}</td> 
            <td>{team.totalActual}</td> 
            <td>{team.totalOptimal}</td>             
          </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
