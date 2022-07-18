const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Player = require('./models/player');
const Game = require('./models/game');
const Team = require('./models/team');

mongoose.connect('mongodb://localhost:27017/Master', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/players', async (req, res) => {
    const players = await Player.find({});
    res.render('players/index', { players });
})

app.get('/players/new', (req, res) => {
    res.render('players/new');
})

app.post('/players', async (req, res) => {
    const player = new Player(req.body.player);
    player.fullName = player.firstName + ' ' + player.lastName;
    await player.save();
    res.redirect(`/players`)
})

app.get('/players/:id', async (req, res) => {
    const player = await Player.findById(req.params.id);
    res.render('players/show', { player });
})

app.get('/players/:id/edit', async (req, res) => {
    const player = await Player.findById(req.params.id);
    res.render('players/edit', { player });
})

app.put('/players/:id', async (req, res) => {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(id, { ...req.body.player });
    res.redirect(`/players/${player._id}`);
})

app.delete('/players/:id', async (req, res) => {
    const { id } = req.params;
    await Player.findByIdAndDelete(id);
    res.redirect('/players');
})

app.get('/games/new', async(req, res) => {
    const players = await Player.find({});
    res.render('games/new', {players});
})

app.get('/leaderboard', async (req, res) => {
    // const temp = await Game.findOne()
    //     .populate({
    //         path: 'winningTeam',
    //         populate: {
    //             path: 'players'
    //         }
    //     }).populate('winningTeam');
    // console.log(temp);

    // const temp2 = await Game.findOne()
    //     .populate({
    //         path: 'winningTeam',
    //         populate: {
    //             path: 'players'
    //         }
    //     })
    //     console.log(JSON.stringify(temp2, null, 4));
        //console.dir(temp2);

    const players = await Player.find({});
    for (const p of players) {
        let totalWins = 0;
        //console.log(JSON.stringify(players, null, 2));
        const games = await Game.find({})
            .populate({
            path: 'winningTeam',
            populate: {
                path: 'players'
            }
        });
        //console.log(JSON.stringify(games, null, 2));
        // for (const g of games) {
        //     let obj = g.find(o => o._id === p._id);
        //     console.log(obj);
        // };
        
        let obj = games.find(g => g.winningTeam.players._id === p._id);
        
        console.log(obj);
        
        
    }

    res.render('leaderboard/index');
})

app.use(((req, res) => {
    res.send('PICK WAS CALLED!')
}))

app.listen(3000, () => {
    console.log('We on port 3000')
})