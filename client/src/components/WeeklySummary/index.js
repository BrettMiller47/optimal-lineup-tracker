import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Stack , Row, Col} from 'react-bootstrap'  

import Summary from './Summary';
import Card from './Card';


export default function WeeklySummary() {
  
  // ! Most recent week's data needed for generating Cards

  const styles = {
    row: {
      margin: '2rem',
      alignItems: 'center',
    },
    divider: {
      borderBottom: '5px solid black'
    }
  }

  return (
    <Stack>
      <Row style={styles.row}>
        <Col xs={4}>
          <Summary/>
        </Col>
        <Col xs={4}>
          <Card />
        </Col>
        <Col xs={4}>
          <Card />
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xs={8} style={styles.divider}>
        </Col>
      </Row>
    </Stack>
  );
}