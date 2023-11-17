const express = require('express');
const app = express();

const dbConfig = require('./config/config');
const mongoose = require('mongoose');

const Route = require('./routes');

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api',Route);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Welcome to tour app"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})