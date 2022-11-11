import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'  

export default function SeasonSummary() {
  
  // ! Data needed for generating SeasonSummary
  const summaryData = [
    {
      name: "Tid, Richie, and a DUI",
      totalActual: 1057.7,
      totalOptimal: 1118.7,
      totalDeficit: -61,
      perfectWeeks: [1, 2, 3]
    },
    {
      name: "Team Ruggs",
      totalActual: 1006.7,
      totalOptimal: 1094.3,
      totalDeficit: -87.6,
      perfectWeeks: [1, 2]
    },
    {
      name: "Barrie’s Breakfast",
      totalActual: 924.55,
      totalOptimal: 1013.95,
      totalDeficit: -89.4,
      perfectWeeks: [1]
    },
    {
      name: "Rick's Market",
      totalActual: 1060.15,
      totalOptimal: 1162.5,
      totalDeficit: -102.35,
      perfectWeeks: [1, 2, 3]
    },
    {
      name: "Pitts Stain",
      totalActual: 966.4,
      totalOptimal: 1074.4,
      totalDeficit: -108,
      perfectWeeks: []
    },
    {
      name: "King of the Hill",
      totalActual: 1055.55,
      totalOptimal: 1165.95,
      totalDeficit: -110.4,
      perfectWeeks: []
    },
    {
      name: "Kevin’s Band",
      totalActual: 1014.3,
      totalOptimal: 1136.5,
      totalDeficit: -122.2,
      perfectWeeks: []
    },
    {
      name: "GruGru Smith-Gruster",
      totalActual: 938.6,
      totalOptimal: 1062.2,
      totalDeficit: -123.6,
      perfectWeeks: []
    },
    {
      name: "Champ Champ",
      totalActual: 1038.6,
      totalOptimal: 1166.4,
      totalDeficit: -127.8,
      perfectWeeks: [1]
    },
    {
      name: "Glizzy Gladiators",
      totalActual: 857.55,
      totalOptimal: 990.4,
      totalDeficit: -132.85,
      perfectWeeks: []
    },
    {
      name: "Plaxico Burress",
      totalActual: 1090.6,
      totalOptimal: 1247,
      totalDeficit: -156.4,
      perfectWeeks: []
    },
    {
      name: "Squid Joey",
      totalActual: 941.75,
      totalOptimal: 1110.4,
      totalDeficit: -168.65,
      perfectWeeks: []
    },
  ];

  const perfectWeeks = summaryData.map((summary, i) => {

    let star = '⭐';
    let starCount = summary.perfectWeeks.length;
    let stars = '-';
    if (starCount !== 0) {
      stars = star.repeat(starCount);     
    }
    
    return stars; 
  });
    

  const styles = {
    container: {
      background: 'white'
    },
    col: {
      padding: 0
    },
    header: {
      background: 'gray',
      borderBottom: '3px solid black',
      textAlign: 'center',
    },
    stars: {
      textAlign: 'right',
    },
    details: {
      fontWeight: 'bold',
      fontSize: '1.25rem',
      padding: '.5rem',
      borderBottom: '1px dotted black'
    },
    deficit: {
      color: 'red'
    }
  }

  return (
    <Container style={styles.container}>
      <Row>
  
        {/* Perfect Weeks */}
        <Col xs={2} style={styles.col}>
          <h5 style={styles.header}>Perfect Weeks</h5>
          {perfectWeeks.map((stars, i) =>
            <h5 key={i} style={styles.stars && styles.details}>{stars}</h5>
          )}
        </Col>

        {/* Team Name */}
        <Col xs={4} style={styles.col}>
          <h5 style={styles.header}>Team Name</h5>
        {summaryData.map((team, i) => 
          <h5 style={styles.details} key={i}>
            {team.name}
          </h5> 
        )}
        </Col>

        {/* Total Start/Sit Deficit */}
        <Col xs={2} style={styles.col}>
          <h5 style={styles.header}>Start/Sit Deficit</h5>
        {summaryData.map((team, i) => 
          <h5 style={styles.deficit && styles.details} key={i}>
            {team.totalDeficit}
          </h5>
        )}
        </Col>
        
        {/* Total Actual */}
        <Col xs={2} style={styles.col}>
          <h5 style={styles.header}>Actual Points</h5>
        {summaryData.map((team, i) => 
          <h5 style={styles.details} key={i}>
            {team.totalActual}
          </h5>
        )}
        </Col>
        
        {/* Total Optimal */}
        <Col xs={2} style={styles.col}>
          <h5 style={styles.header}>Potential Points</h5>
        {summaryData.map((team, i) => 
          <h5 style={styles.details} key={i}>
            {team.totalOptimal}
          </h5>
        )}
        </Col>
        
      </Row>
    </Container>
  );
}