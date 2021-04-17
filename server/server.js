const express = require('express');
const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
    const db = client.db('memory_game');
    const playersCollection = db.collection('players');
    app.use('/api/players', createRouter(playersCollection));
})
.catch(console.error);

app.listen(3000, function() {
    console.log(`Game server running on port ${this.address().port}`);
})