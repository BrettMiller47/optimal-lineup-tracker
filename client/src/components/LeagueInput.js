import React, {useState} from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LeagueInput() {
  
  const styles = {
    cardTitle: {
      padding: '2rem',
      fontWeight: 'bold'
    },
    input: {
      width: '15rem',
      margin: 'auto',
      marginBottom: '1rem'
    }
  }

  const [isValidId, setIsValidId] = useState(false);
  const handleIdChange = (e) => {
    
    // check if there is a match for 8 numerical characters
    let idRegexMatch = e.target.value.match('^[0-9]{8}$');
    
    // If a match is found..
    if (idRegexMatch != null) {
      setIsValidId(true);
      document.getElementById('leagueId').style.borderColor = 'green';
      document.getElementById('leagueId').style.boxShadow = '0 0 0 0.1rem green';

    // Otherwise...
    } else {
      setIsValidId(false);
      document.getElementById('leagueId').style.borderColor = 'red';
      document.getElementById('leagueId').style.boxShadow = '0 0 0 0.1rem red';
    }
  }

  const handleLeagueInput = () => {
    let leagueId = document.getElementById('leagueId').value;
    localStorage.setItem('leagueId', leagueId);
  }

  return (
    <>
      <Card className='text-center'>
        <Card.Body>
          <Card.Title style={styles.cardTitle}>Get your ESPN Fantasy Football league's Start/Sit data in under 10 min!</Card.Title>
          <Card.Text>
            <b>Step 1)</b> Go to your fantasy team's page.
          </Card.Text>
          <Card.Text>
              <b>Step 2)</b> Copy your "leagueId" from the url and enter it below.
          </Card.Text>  
          <Form.Control id="leagueId" maxLength="8" onChange={handleIdChange} style={styles.input} aria-describedby="leagueId input" placeholder='Enter leagueId (ex: 84532749)' />

          {/* don't allow the user to navigate unless isValidId */}
          {isValidId ?
            <Link to='/leagueSummary'>
              <Button onClick={handleLeagueInput}>Run the numbers!</Button>
            </Link>
            : 
            <Button onClick={handleLeagueInput}>Run the numbers!</Button>
          }
        </Card.Body>
      </Card>
    </>
  );
}
