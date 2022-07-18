const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }
    ]
});

module.exports = mongoose.model('Team', TeamSchema);