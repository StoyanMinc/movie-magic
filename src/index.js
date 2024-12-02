const express = require('express');
const mongoose = require('mongoose');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const router = require('./routes');

const PORT = 5000

const app = express();

configHandlebars(app)
configExpress(app);

app.use(router);
try {
    mongoose.connect('mongodb://localhost:27017')
    console.log('DB connected!');
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    
} catch (error) {
    console.log(error.message);
}