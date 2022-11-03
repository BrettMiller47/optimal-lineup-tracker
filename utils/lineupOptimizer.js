import { getWeeklyData } from "./getWeeklyData.js";

let data = await getWeeklyData(2022, 2, 84532749, 1);
console.log(data);

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
console.log(getActualTotal(data));

// getOptimalLineup
  // getAllPlayersAtPosition
  // assignBestPlayersAtStrictPositions
  // assignRemainingPlayersAtFlexPositions

// getOptimalTotal