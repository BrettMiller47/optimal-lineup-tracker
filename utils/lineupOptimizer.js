import { getWeeklyData } from "./getWeeklyData.js";

let rawLineup = await getWeeklyData(2022, 2, 84532749, 1);

// ! --------- CONSTRAINTS ---------
// By POS:
// -- QB must be QB slot
// -- RB must be RB slot
// -- WR must be WR slot
// -- TE must be TE slot
// -- FLEX can only be RB || WR || TE

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

function isEligibleQB(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'QB';
}

function isEligibleRB(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'RB';
}

function isEligibleWR(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'WR';
}

function isEligibleTE(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'TE';
}

function isEligibleFLEX(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'RB' || 'WR' || 'TE';
}

function isEligibleD(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'D/ST';
}

function isEligibleK(lineup, idxPlayer) {
  let position = lineup[idxPlayer].POS; 
  return position == 'K';
}

function getOptimalStartingLineup() {
  // getAllPlayersAtPosition
  // assignBestPlayersAtStrictPositions
  // assignRemainingPlayersAtFlexPositions
  console.log('');
}

// getOptimalTotal