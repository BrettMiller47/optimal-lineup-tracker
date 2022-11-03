import { getWeeklyData } from "./getWeeklyData.js";

let lineup = await getWeeklyData(2022, 2, 84532749, 1);
console.log(lineup);

// ! --------- CONSTRAINTS ---------
// By POS:
// -- QB must be QB slot
// -- RB must be RB slot
// -- WR must be WR slot
// -- TE must be TE slot
// -- FLEX can only be RB || WR || TE


// getActualTotal
export default function getActualTotal(lineup) {
  
  let total = 0;
  for (let player in lineup) {
    let notOnBench = lineup[player].SLOT != 'Bench'; 
    if (notOnBench) {
      console.log(lineup[player].PLAYER);
      total += +(lineup[player].SCORE); 
    }
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

for (let player in lineup) {
  console.log(lineup[player].PLAYER);
  console.log('QB ? ' + isEligibleQB(lineup, player));
  console.log('RB ? ' + isEligibleRB(lineup, player));
  console.log('WR ? ' + isEligibleWR(lineup, player));
  console.log('TE ? ' + isEligibleTE(lineup, player));
  console.log('FLEX ? ' + isEligibleFLEX(lineup, player));
  console.log('D ? ' + isEligibleD(lineup, player));
  console.log('K ? ' + isEligibleK(lineup, player));
}

// getOptimalLineup
  // getAllPlayersAtPosition
  // assignBestPlayersAtStrictPositions
  // assignRemainingPlayersAtFlexPositions

// getOptimalTotal