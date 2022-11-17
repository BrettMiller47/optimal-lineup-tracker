const { Schema, model} = require('mongoose');

const lineupSchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ],
  totalFPTS: {
    type: Number,
    required: true,
  }
});

const Lineup = model('Lineup', lineupSchema);

module.exports = Lineup;
