import React from 'react';
import Table from 'react-bootstrap/Table';

export default function SeasonSummary(props) {
  
  // ! Data needed for generating SeasonSummary
  // (on data query replace 'star' with \u2850)
  const summaryData = [
  {
    "name": "Tid, Richie, and a DUI",
    "totalActual": 1172.45,
    "totalOptimal": 1233.45,
    "totalDeficit": -61,
    "perfectWeeks": "starstarstarstar"
  },
  {
    "name": "Barrie’s Breakfast",
    "totalActual": 1043.15,
    "totalOptimal": 1134.75,
    "totalDeficit": -91.6,
    "perfectWeeks": "star"
  },
  {
    "name": "Team Ruggs",
    "totalActual": 1070.1,
    "totalOptimal": 1166.7,
    "totalDeficit": -96.6,
    "perfectWeeks": "starstar"
  },
  {
    "name": "Rick's Market",
    "totalActual": 1138.45,
    "totalOptimal": 1256.3,
    "totalDeficit": -117.85,
    "perfectWeeks": "starstarstar"
  },
  {
    "name": "Pitts Stain",
    "totalActual": 1058.8,
    "totalOptimal": 1178.2,
    "totalDeficit": -119.4,
    "perfectWeeks": ""
  },
  {
    "name": "King of the Hill",
    "totalActual": 1187.2,
    "totalOptimal": 1306.7,
    "totalDeficit": -119.5,
    "perfectWeeks": ""
  },
  {
    "name": "Kevin’s Band of Retards",
    "totalActual": 1151.25,
    "totalOptimal": 1284.25,
    "totalDeficit": -133,
    "perfectWeeks": ""
  },
  {
    "name": "Glizzy Gladiators",
    "totalActual": 949.9,
    "totalOptimal": 1094.75,
    "totalDeficit": -144.85,
    "perfectWeeks": ""
  },
  {
    "name": "Champ Champ",
    "totalActual": 1142.65,
    "totalOptimal": 1290.85,
    "totalDeficit": -148.2,
    "perfectWeeks": "star"
  },
  {
    "name": "GruGru Smith-Gruster",
    "totalActual": 1038.25,
    "totalOptimal": 1198.65,
    "totalDeficit": -160.4,
    "perfectWeeks": ""
  },
  {
    "name": "Plaxico Burress",
    "totalActual": 1217.9,
    "totalOptimal": 1388.4,
    "totalDeficit": -170.5,
    "perfectWeeks": ""
  },
  {
    "name": "Squid Joey",
    "totalActual": 1027.3,
    "totalOptimal": 1201.75,
    "totalDeficit": -174.45,
    "perfectWeeks": ""
  }
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
            <td style={styles.stars} key={`stars${i}`}>{team.perfectWeeks.replace(/star/g, '⭐')}</td> 
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
