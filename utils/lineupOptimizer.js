import { getWeeklyData } from "./getWeeklyData.js";

let rawLineup = await getWeeklyData(2022, 2, 84532749, 1);

function getActualStartingLineup(lineupWithBench) {
  
  let startingLineup = [];
  for (let player in lineupWithBench) {
    let notOnBench = lineupWithBench[player].SLOT != 'Bench'; 
    if (notOnBench) {
      startingLineup.push(lineupWithBench[player]);
    }
  }

  return startingLineup;
}

function getTotal(startingLineup) {
  
  let total = 0;
  for (let player in startingLineup) {
    total += +(startingLineup[player].SCORE); 
  }
  return total;
}

// -------- GET POSITION ELIGIBILITY --------
function isEligibleQB(player) {
  let position = player.POS; 
  return position == 'QB';
}

function isEligibleRB(player) {
  let position = player.POS; 
  return position == 'RB';
}

function isEligibleWR(player) {
  let position = player.POS; 
  return position == 'WR';
}

function isEligibleTE(player) {
  let position = player.POS; 
  return position == 'TE';
}

function isEligibleFLEX(player) {
  let position = player.POS; 
  return (position == ('RB') || position == 'WR' || position == 'TE');
}

function isEligibleD(player) {
  let position = player.POS; 
  return position == 'D/ST';
}

function isEligibleK(player) {
  let position = player.POS; 
  return position == 'K';
}

// -------- GET HIGHEST SCORER @ POSITION --------
function getHighestScoringQB(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleQB(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringRB(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleRB(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringWR(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleWR(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringTE(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleTE(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringFLEX(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleFLEX(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringD(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleD(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringK(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.SCORE == '--') {
      player.SCORE = 0.0;
    }
    if (isEligibleK(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.SCORE - b.SCORE;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

// ! assignFLEX must be done after RB, WR, and TE
function getOptimalStartingLineup() {

  //assign QB


  // getAllPlayersAtPosition
  // assignBestPlayersAtStrictPositions
  // assignRemainingPlayersAtFlexPositions
  console.log('');
}

// getOptimalTotal