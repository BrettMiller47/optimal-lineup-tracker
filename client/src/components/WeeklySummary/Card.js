import React from 'react';

export default function Card() {
  
  // ! Data needed for generating Card
  

  const styles = {
    card: {
      width: '18rem',
      boxShadow: '0px 0px 5px black',
      margin: '2rem'
    },
    row: {
      width: '100%',
    },
    teamTotal: {
      padding: '0',
      margin: '0',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '3px'

    },
    playerInfo: {
      padding: '0',
      margin: '0',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '3px'
    },
  }

  return (
    <>
      <div className='container' style={styles.card}>
        <div className='row' style={styles.row}>
          <h3 style={styles.teamTotal}>
            <span>What's a king Tua God?</span>
            <span>120.65</span>
          </h3>
        </div>
        <div className='row' style={styles.row}>
          <h4 style={styles.playerInfo}>
            <span>QB</span>
            <span>Lamar Jackson</span>
            <span>23.25</span>
          </h4>
        </div>
      </div>
    </>
  );
}