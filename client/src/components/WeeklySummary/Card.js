import React from 'react';
import {Stack} from 'react-bootstrap'  

export default function Card(props) {
  
  const styles = {
    card: {
      width: '19rem',
      boxShadow: '0px 0px 5px black',
    },
    row: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '.4rem',
    },
  }

  return (
    <>
      <Stack style={styles.card}>
        {/* Create a row for each player in team */}
        {props.lineup.map((player) =>
          <Stack direction='horizontal' style={styles.row}>
            <h5>{player.SLOT}</h5>
            <h5>{player.PLAYER}</h5>
            <h5>{player.FPTS}</h5>
          </Stack>
        )
        }
      </Stack>
    </>
  );
}