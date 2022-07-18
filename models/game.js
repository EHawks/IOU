const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    winningTeam: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    losingTeam: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    date: Date

});

module.exports = mongoose.model('Game', GameSchema);