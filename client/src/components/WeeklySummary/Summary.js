import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Stack , Row, Col} from 'react-bootstrap'  
import Card from './Card';

export default function Summary() {
  
  const styles = {
    container: {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center'
    },
    teamName: {
      display: 'flex',
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    detailsRow: {
      display: 'flex',
      flexDirection: 'horizontal',
      justifyContent: 'space-between',
      fontSize: '1rem',
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
    <Stack style={styles.container}>
      <Row style={styles.teamName}>
        What's a king Tua God?
      </Row>
      <Row style={styles.detailsRow}>
        <Col xs={6} style={styles.detail}>Actual Points:</Col>
        <Col xs={6} style={styles.number}>120.65</Col>
      </Row>
      <Row style={styles.detailsRow}>
        <Col xs={6} style={styles.detail}>Potential Points:</Col>
        <Col xs={6} style={styles.number}>130.8</Col>
      </Row>
      <Row style={styles.detailsRow}>
        <Col xs={6} style={styles.detail}>Start/Sit Deficit:</Col>
        <Col xs={6} style={styles.number}>10.25</Col>
      </Row>
    </Stack>
  );
}