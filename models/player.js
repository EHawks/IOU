const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: String,
    fullName: String,
    email: String,
    phoneNumber: String,
    primaryPosition: String,
    wins: Number,
    losses: Number,
    teamMates: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Player',
            wins: Number,
            losses: Number
        }
    ]
});

module.exports = mongoose.model('Player', PlayerSchema);