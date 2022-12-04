import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';

export default function Card(props) {
  
  const styles = {
    card: {
      boxShadow: '0px 0px 5px black',
      width: '19rem'
    }
  }

  return (
    <>
      <Table style={styles.card}>
        <tbody>
          {/* Create a row for each player in team */}
          {props.lineup.players.map((player, i) =>
            <tr key={i}>
              <td>{props.positionOrder[i]}</td>
              <td>{player.PLAYER}</td>
              <td>{player.FPTS}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}