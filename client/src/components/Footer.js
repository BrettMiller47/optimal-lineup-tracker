import React from 'react';
import {Row} from 'react-bootstrap' 

export default function Footer() {
  
  return (
    <Row className='m-1 text-center bg-secondary text-light'>
      <h6>For inquiries, reach out to{' '}
        <a href='mailto:brett.miller47@yahoo.com?subject=START-SIT-DEFICIT' className='text-light'>
           brett.miller47@yahoo.com
        </a>
      </h6>
    </Row>
  );
}