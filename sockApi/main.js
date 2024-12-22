// ce ci est le fichier principal.
/**
 * De base la conexion websocket est comme un upgrage de la connxion https:
 * donc ça vas http -> https -> ws
 * pour ça, il faut bien qu'il y ai un serveur http d'abord:
 */

const express = require('express');
const bodyParser = require('body-parser');


const { createServer } = require('node:http');

const port = 500;
const app = express();
const httpServer = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use( (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'); // à modifier par un truc
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use("/", require("./routes/numRoute"));

httpServer.listen(port, ()=>{
    console.log("server started on port ", port);
});
