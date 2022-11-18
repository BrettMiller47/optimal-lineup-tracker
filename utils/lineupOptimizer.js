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
    let FPTSDecimals = Math.round(FPTS * 100) / 100;
    // console.log(`${startingLineup[player].PLAYER} scored ${FPTSDecimals}`);
    total += FPTSDecimals; 
  }
  return total;
}

export function getStartingLineup(rawLineup) {
  
  let startingLineup = [];

  // Loop through the starting slots and assign the slot to handle errors with scraping's initial assignment
  for (let slot in rawLineup) {
    let player = rawLineup[slot];

    if (player.SLOT != 'BE') {
      startingLineup.push(player);
    }
  }

  return startingLineup;
}

export function getOptimalStartingLineup(rawLineup) {

  let optimalStartingLineup = [];

  // Fill the starting slots with the highest FPTSr at the position (fill FLEX last)
  let availablePlayers = rawLineup;
  for (let slot in rawLineup) {
    let position = rawLineup[slot].SLOT;
    
    // Depending on the slot's position...
    // -- get the highest scoring player at the position
    // -- add the player to the optimalStartingLineup 
    // -- remove the player from the rawLineup
    let player = {};
    switch (position) {
      case 'QB':
        player = getHighestScoringQB(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
      
      case 'RB':
        player = getHighestScoringRB(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
      
      case 'WR':
        player = getHighestScoringWR(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
      
      case 'TE':
        player = getHighestScoringTE(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
      
      case 'D/ST':
        player = getHighestScoringD(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
      
      case 'K':
        player = getHighestScoringK(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
      
      case 'FLEX':
        player = getHighestScoringFLEX(availablePlayers);
        optimalStartingLineup.push(player);
        availablePlayers = availablePlayers.filter(function(item) {return item.PLAYER != player.PLAYER;})
        break
    }
  }

  return optimalStartingLineup;
}
