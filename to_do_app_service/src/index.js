'use strict'
const {app} = require("./app");
const http = require('http');

http.createServer(app).listen(app.get('port'), () => {
    console.log(`El servidor esta corriendo en http://localhost:${app.get('port')}`);
});