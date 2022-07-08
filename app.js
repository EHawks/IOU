const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("HELLO");
})

app.listen(3000, ()=> {
    console.log('We on port 3000')
})