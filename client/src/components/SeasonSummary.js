import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SeasonSummary() {
  
  // ! Data needed for generating SeasonSummary
  // (on data query replace 'star' with \u2850)
  const summaryData = [
    {
      name: "Tid, Richie, and a DUI",
      totalActual: 1057.7,
      totalOptimal: 1118.7,
      totalDeficit: -61,
      perfectWeeks: '\u2B50\u2B50\u2B50'
    },
    {
      name: "Team Ruggs",
      totalActual: 1006.7,
      totalOptimal: 1094.3,
      totalDeficit: -87.6,
      perfectWeeks: '\u2B50\u2B50'
    },
    {
      name: "Barrie’s Breakfast",
      totalActual: 924.55,
      totalOptimal: 1013.95,
      totalDeficit: -89.4,
      perfectWeeks: '\u2B50'
    },
    {
      name: "Rick's Market",
      totalActual: 1060.15,
      totalOptimal: 1162.5,
      totalDeficit: -102.35,
      perfectWeeks: '\u2B50\u2B50\u2B50'
    },
    {
      name: "Pitts Stain",
      totalActual: 966.4,
      totalOptimal: 1074.4,
      totalDeficit: -108,
      perfectWeeks: ' '
    },
    {
      name: "King of the Hill",
      totalActual: 1055.55,
      totalOptimal: 1165.95,
      totalDeficit: -110.4,
      perfectWeeks: ' '
    },
    {
      name: "Kevin’s Band",
      totalActual: 1014.3,
      totalOptimal: 1136.5,
      totalDeficit: -122.2,
      perfectWeeks: ' '
    },
    {
      name: "GruGru Smith-Gruster",
      totalActual: 938.6,
      totalOptimal: 1062.2,
      totalDeficit: -123.6,
      perfectWeeks: ' '
    },
    {
      name: "Champ Champ",
      totalActual: 1038.6,
      totalOptimal: 1166.4,
      totalDeficit: -127.8,
      perfectWeeks: '\u2B50'
    },
    {
      name: "Glizzy Gladiators",
      totalActual: 857.55,
      totalOptimal: 990.4,
      totalDeficit: -132.85,
      perfectWeeks: ' '
    },
    {
      name: "Plaxico Burress",
      totalActual: 1090.6,
      totalOptimal: 1247,
      totalDeficit: -156.4,
      perfectWeeks: ' '
    },
    {
      name: "Squid Joey",
      totalActual: 941.75,
      totalOptimal: 1110.4,
      totalDeficit: -168.65,
      perfectWeeks: ' '
    },
  ];
  
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
          <th>Perfect Weeks</th>
          <th>Team</th>
          <th>Start/Sit Deficit</th>
          <th>Actual Points</th>
          <th>Potential Points</th>
        </thead>
        <tbody>
          {summaryData.map((team, i) => 
          <tr>
            <td style={styles.stars} key={i}>{team.perfectWeeks}</td> 
            <td style={styles.team} key={i}>{team.name}</td> 
            <td style={styles.deficit} key={i}>{team.totalDeficit}</td> 
            <td key={i}>{team.totalActual}</td> 
            <td key={i}>{team.totalOptimal}</td>             
          </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
