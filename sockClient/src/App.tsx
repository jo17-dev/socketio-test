import axios from 'axios';
import './App.css'
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const App = ()=>{
const [num, setNum] = useState(0);

const [errMessaage, setErrMessage] = useState("");

const [connStatut, setConnStatut] = useState(false);

// on initialise la socket. la partie ws du serveur est sur l'uri --/stream/
const socket = io("http://localhost:500", {
  path: "/stream/"
  // port: 500
});

useEffect(()=>{
    console.log("chargement unique du component");

    // pour le client, on écouter uniquement l'évenement getNumber pour récupérer son contenue qui est enfait le nouveau nombre
    socket.on("getNumber", (message)=>{
      console.log("message arrived");
      setNum(message);
    });

  }, []);
  
  return (
    <>
      <h1>Client: real item stream</h1>
      <p>actually the number is: <strong> {num} </strong> </p>
      <strong> {connStatut} </strong>
    </>
  );
}

export default App;