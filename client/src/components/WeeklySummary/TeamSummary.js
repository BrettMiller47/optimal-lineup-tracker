import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Stack , Row, Col} from 'react-bootstrap'  

export default function TeamSummary(props) {
  
  const styles = {
    container: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
    },
    teamNameRow: {
      display: 'flex',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      paddingBottom: '1rem',
      textAlign: 'center',
      margin: 0
    },
    detailsRow: {
      display: 'flex',
      flexDirection: 'horizontal',
      justifyContent: 'space-between',
      fontSize: '1.3rem',
    },
    detail: {
      padding: 0,
      textAlign: 'right',
    },
    number: {
      textAlign: 'left'
    },
    deficit: {
      textAlign: 'left',

    }
  }

  return (
    // Map each team in weeklyData
    <Stack style={styles.container}>
      <Row style={styles.teamNameRow}>
        {props.name}
      </Row>
      <Row style={styles.detailsRow}>
        <Col xs={6} style={styles.detail}>Actual Points:</Col>
        <Col xs={6} style={styles.number}>{props.actualFPTS}</Col>
      </Row>
      <Row style={styles.detailsRow}>
        <Col xs={6} style={styles.detail}>Potential Points:</Col>
        <Col xs={6} style={styles.number}>{props.optimalFPTS}</Col>
      </Row>
      <Row style={styles.detailsRow}>
        <Col xs={6} style={styles.detail}>Start/Sit Deficit:</Col>
        <Col xs={6} style={styles.number}>{props.deficit}</Col>
      </Row>
    </Stack>
  );
}