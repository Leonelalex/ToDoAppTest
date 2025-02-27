const express = require("express");
const bodyParser = require('body-parser');
const port = 3000;
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(require('./routes/UserRoutes'));
app.use(require('./routes/ToDoRoutes'));

app.set('port', process.env.PORT || port);

module.exports = {app};