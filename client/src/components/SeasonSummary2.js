import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SeasonSummary2(props) {
  
  // ! Data needed for generating SeasonSummary
  // (on data query replace 'star' with \u2850)
  
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
          <tr>
            <td style={styles.stars} key={`stars${i}`}>⭐</td> 
            <td style={styles.team} key={`name${i}`}>{team.name}</td> 
            <td style={styles.deficit} key={`deficit${i}`}>{team.totalDeficit}</td> 
            <td key={`totalActual${i}`}>{team.totalActual}</td> 
            <td key={`totalOptimal${i}`}>{team.totalOptimal}</td>             
          </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
