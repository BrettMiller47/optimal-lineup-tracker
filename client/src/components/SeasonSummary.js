import { split } from '@apollo/client';
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

  const starsByTeam = props.teams.map((team) => {
    let weeks = team.perfectWeeks;
    let starsCsv = weeks.replace(/\d{1,2}/g, '⭐');
    let starsCount = starsCsv.split('⭐').length-1;
    let starsStr = '⭐'.repeat(starsCount);
    return starsStr;
  });

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
            <td style={styles.stars}>{starsByTeam[i]}</td> 
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
