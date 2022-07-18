const mongoose = require('mongoose');
const Player = require('./models/player');
const Team = require('./models/team');
const Game = require('./models/game');

mongoose.connect('mongodb://localhost:27017/Master', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

async function seedDB() {

    await Player.deleteMany({});
    await Team.deleteMany({});
    const seedPlayers = [
        {
            name: 'Alpha'
        },
        {
            name: 'Beta'
        },
        {
            name: 'Charlie'
        },
        {
            name: 'Delta'
        },
        {
            name: 'Echo'
        },
        {
            name: 'Foxtrot'
        },
        {
            name: 'Golf'
        },
        {
            name: 'Hulu'
        },
        {
            name: 'Iota'
        },
        {
            name: 'Jupiter'
        },
        {
            name: 'Kilo'
        },
        {
            name: 'Lima'
        },
        {
            name: 'Mike'
        },
        {
            name: 'November'
        },
    ]

    await Player.insertMany(seedPlayers)
    await createTeams();
}
let alphaId, betaId, charlieId, deltaId, echoId, foxtrotId, golfId, huluId, iotaId, jupiterId, kiloId, limaId, mikeId, novemberId;

async function generate() {
    await Player.findOne({ name: 'Alpha' })
        .then(
            p => { alphaId = p._id }
        )
    await Player.findOne({ name: 'Beta' })
        .then(
            p => { betaId = p._id }
        )
    await Player.findOne({ name: 'Charlie' })
        .then(
            p => { charlieId = p._id }
        )
    await Player.findOne({ name: 'Delta' })
        .then(
            p => { deltaId = p._id }
        )
    await Player.findOne({ name: 'Echo' })
        .then(
            p => { echoId = p._id }
        )
    await Player.findOne({ name: 'Foxtrot' })
        .then(
            p => { foxtrotId = p._id }
        )
    await Player.findOne({ name: 'Golf' })
        .then(
            p => { golfId = p._id }
        )
    await Player.findOne({ name: 'Hulu' })
        .then(
            p => { huluId = p._id }
        )
    await Player.findOne({ name: 'Iota' })
        .then(
            p => { iotaId = p._id }
        )
    await Player.findOne({ name: 'Jupiter' })
        .then(
            p => { jupiterId = p._id }
        )
    await Player.findOne({ name: 'Kilo' })
        .then(
            p => { kiloId = p._id }
        )
    await Player.findOne({ name: 'Lima' })
        .then(
            p => { limaId = p._id }
        )
    await Player.findOne({ name: 'Mike' })
        .then(
            p => { mikeId = p._id }
        )
    await Player.findOne({ name: 'November' })
        .then(
            p => { novemberId = p._id }
        )

}

async function createTeams() {
    await generate();
    const seedTeams = [
        {
            players: [
                alphaId,
                betaId,
                charlieId,
                deltaId,
                echoId,
                foxtrotId,
                golfId
            ]
        },
        {
            players: [
                huluId,
                iotaId,
                jupiterId,
                kiloId,
                limaId,
                mikeId,
                novemberId
            ]
        },
        {
            players: [
                alphaId,
                betaId,
                charlieId,
                deltaId,
                novemberId,
                foxtrotId,
                golfId
            ]
        },
        {
            players: [
                huluId,
                iotaId,
                jupiterId,
                kiloId,
                limaId,
                mikeId,
                echoId
            ]
        },
        {
            players: [
                alphaId,
                betaId,
                charlieId,
                deltaId,
                echoId,
                foxtrotId,
                mikeId
            ]
        },
        {
            players: [
                huluId,
                iotaId,
                jupiterId,
                kiloId,
                limaId,
                golfId,
                novemberId
            ]
        },
        {
            players: [
                alphaId,
                betaId,
                charlieId,
                deltaId,
                echoId,
                jupiterId,
                golfId
            ]
        },
        {
            players: [
                huluId,
                iotaId,
                foxtrotId,
                kiloId,
                limaId,
                mikeId,
                novemberId
            ]
        },
        {
            players: [
                huluId,
                betaId,
                charlieId,
                deltaId,
                echoId,
                foxtrotId,
                golfId
            ]
        },
        {
            players: [
                alphaId,
                iotaId,
                jupiterId,
                kiloId,
                limaId,
                mikeId,
                novemberId
            ]
        }

    ]
    let listOfTeams= [];
    await Team.insertMany(seedTeams)
        .then(res => {
            for (const team in res) {
                listOfTeams.push(res[team]._id);
            }
        }).catch(e => {
            console.log(e);
        })
    console.log('---------------------')
    //await Team.find().then(p => { console.log(p) })

    for(let i = 0; i < listOfTeams.length; i+=2){
        let tempGame = new Game ({
            winningTeam: listOfTeams[i],
            losingTeam: listOfTeams[i+1],
        });
        await tempGame.save();

    }

}

seedDB();