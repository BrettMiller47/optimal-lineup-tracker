const { Schema, model} = require('mongoose');

const playerSchema = new Schema({
  SLOT: {
    type: String,
    required: true
  },
  PLAYER: {
    type: String,
    required: true
  },
  TEAM: {
    type: String,
    required: true
  },
  POS: {
    type: String,
    required: true
  },
  OPP: {
    type: String,
    required: true
  },
  STATUS: {
    type: String,
    required: true
  },
  PROJ: {
    type: String,
    required: true
  },
  FPTS: {
    type: String,
    required: true
  },
});

const Player = model('Player', playerSchema);

module.exports = Player;
