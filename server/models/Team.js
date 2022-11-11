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
    type: Number,
    required: true,
  }
});

const Team = model('Team', teamSchema);

module.exports = Team;
