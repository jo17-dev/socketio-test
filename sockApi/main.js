// ce ci est le fichier principal.
/**
 * De base la conexion websocket est comme un upgrage de la connxion https:
 * donc ça vas http -> https -> ws
 * pour ça, il faut bien qu'il y ai un serveur http d'abord:
 */

/**
 * Pour creer la partie serveur websocket,
 * on vas creer une nouvelle instance de l'object Server de la lib socket.io
 */

const express = require('express');
const bodyParser = require('body-parser');


const { createServer } = require('node:http');

const {Server} = require('socket.io');
const { nombre } = require('./routes/numRoute');
const nombreModel = require('./model/nombre.model');

const port = 500;
const app = express();
const httpServer = createServer(app);
const wsServer = new Server(httpServer);


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*'); // à modifier par un truc
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

app.use("/", require("./routes/numRoute"));

// creation du serveur socket.io
wsServer.listen(httpServer, {
    path: "/stream",
    cors: {
        origin: "*",
        methods: "*"
    }
} );

wsServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("getNumber", nombreModel.getNombre()); // l'envoie le bre a la connexion

    // event de chagement de nombre par l'admin. on le change en interne et on informe le front
    socket.on('sendNumber', (message)=>{
        console.log("number received hahaha");
        console.log(message);
        nombreModel.setNombre(message);

        // on informe le front. ( avec server.emit..)
        wsServer.emit("getNumber", nombreModel.getNombre());
    });
    

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});


httpServer.listen(port, ()=>{
    console.log("server started on port ", port);
});
