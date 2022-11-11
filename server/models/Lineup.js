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
  actualPlayers: [
    [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lineup'
      }
    ]
  ],
  actualFPTS: {
    type: Number,
    required: true,
  },
  optimalPlayers: [
    [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lineup'
      }
    ]
  ],
  optimalFPTS: {
    type: Number,
    required: true,
  },
  deficit: {
    type: Number,
    required: true,
  }
});

const Lineup = model('Lineup', lineupSchema);

module.exports = Lineup;
