import { getWeeklyData } from "./getWeeklyData.js";

let rawLineup = await getWeeklyData(2022, 2, 84532749, 1);

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

function getStartingSlots(rawLineup) {
  let startingSlots = [];
  for (let player in rawLineup) {
    let notOnBench = rawLineup[player].SLOT != 'Bench'; 
    if (notOnBench) {
      startingSlots.push(rawLineup[player].SLOT);
    }
  }

  return startingSlots;
}

// -------- EXPORTED FUNCTIONS ---------

export function getTotal(startingLineup) {
  
  let total = 0.0;
  for (let player in startingLineup) {
    total += +(startingLineup[player].SCORE); 
  }
  return total.toFixed(2);
}

export function getActualStartingLineup(rawLineup) {
  
  let startingLineup = [];
  for (let player in rawLineup) {
    let notOnBench = rawLineup[player].SLOT != 'Bench'; 
    if (notOnBench) {
      startingLineup.push(rawLineup[player]);
    }
  }

  return startingLineup;
}

export function getOptimalStartingLineup(rawLineup) {

  let startingSlots = getStartingSlots(rawLineup);
  let optimalStartingLineup = [];

  // Fill the starting slots with the highest scorer at the position (fill FLEX last)
  for (let slot in startingSlots) {
    let position = startingSlots[slot];
    
    // Depending on the slot's position...
    // -- get the highest scoring player at the position
    // -- add the player to the optimalStartingLineup 
    // -- remove the player from the rawLineup
    let player = {};
    switch (position) {
      case 'QB':
        player = getHighestScoringQB(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'RB':
        player = getHighestScoringRB(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'WR':
        player = getHighestScoringWR(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'TE':
        player = getHighestScoringTE(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'D/ST':
        player = getHighestScoringD(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'K':
        player = getHighestScoringK(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'FLEX':
        player = getHighestScoringFLEX(rawLineup);
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
    }
  }

  return optimalStartingLineup;
}
