const { Schema, model} = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  startingLineups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lineup'
    }
  ],
  startingTotals: [
    { type: Number }
  ],
  optimalLineups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lineup'
    }
  ],
  optimalTotals: [
    { type: Number }
  ],
  totalActual: {
    type: Number,
    required: true,
  },
  totalOptimal: {
    type: Number,
    required: true,
  },
  totalDeficit: {
    type: Number,
    required: true,
  },
  perfectWeeks: {
    type: String,
    required: true,
  }
});

const Team = model('Team', teamSchema);

module.exports = Team;
