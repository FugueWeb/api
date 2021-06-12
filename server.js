const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, function(){
    var p = server.address().port;
    console.log("App running on port " + p);
});