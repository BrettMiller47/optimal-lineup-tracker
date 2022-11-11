const { Schema, model} = require('mongoose');

const leagueSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
});

const League = model('League', leagueSchema);

module.exports = League;
