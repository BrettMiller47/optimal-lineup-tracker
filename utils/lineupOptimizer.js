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

// -------- GET HIGHEST FPTS @ POSITION --------
function getHighestScoringQB(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleQB(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringRB(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleRB(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringWR(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleWR(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringTE(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleTE(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringFLEX(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleFLEX(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringD(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleD(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
  }).reverse();

  // Return the highest scoring player
  return sorted[0];
}

function getHighestScoringK(players) {
  let eligiblePlayers = [];
  
  // Assemble the array of eligible players at the position
  for (let i in players) {
    let player = players[i];
    if (player.FPTS == '--') {
      player.FPTS = 0.0;
    }
    if (isEligibleK(player)) {
      eligiblePlayers.push(player)
    }
  }

  let sorted = eligiblePlayers.sort(function (a, b) {
    return a.FPTS - b.FPTS;
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
  
  let total = 0.00;
  for (let player in startingLineup) {

    let FPTS = parseFloat(startingLineup[player].FPTS);
    let FPTSDecimals = Math.round(FPTS * 100)/100;
    total += FPTSDecimals; 
  }
  return total;
}

export function getStartingLineup(rawLineup) {
  
  let startingLineup = [];
  for (let player in rawLineup) {

    let notOnBenchOrIr = (rawLineup[player].SLOT != 'Bench' && rawLineup[player].SLOT != 'IR'); 
    if (notOnBenchOrIr) {
      startingLineup.push(rawLineup[player]);
    }
  }

  return startingLineup;
}

export function getOptimalStartingLineup(rawLineup) {

  let startingSlots = getStartingSlots(rawLineup);
  let optimalStartingLineup = [];

  // Fill the starting slots with the highest FPTSr at the position (fill FLEX last)
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
        player.SLOT = 'QB';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'RB':
        player = getHighestScoringRB(rawLineup);
        player.SLOT = 'RB';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'WR':
        player = getHighestScoringWR(rawLineup);
        player.SLOT = 'WR';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'TE':
        player = getHighestScoringTE(rawLineup);
        player.SLOT = 'TE';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'D/ST':
        player = getHighestScoringD(rawLineup);
        player.SLOT = 'D/ST';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'K':
        player = getHighestScoringK(rawLineup);
        player.SLOT = 'K';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
      
      case 'FLEX':
        player = getHighestScoringFLEX(rawLineup);
        player.SLOT = 'FLEX';
        optimalStartingLineup.push(player);
        rawLineup = rawLineup.filter(rawLineupPlayer => rawLineupPlayer != player);
        break
    }
  }

  return optimalStartingLineup;
}
