const express = require('express');

const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const router = require('./routes');

const PORT = 5000

const app = express();

configHandlebars(app)
configExpress(app);

app.use(router);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));