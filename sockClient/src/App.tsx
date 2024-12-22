import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';

const App = ()=>{
  const [num, setNum] = useState(0);

  const [errMessaage, setErrMessage] = useState("");


  useEffect(()=>{
    console.log("chargement unique du component");

    axios.get("http://localhost:500/").then(
      (response)=>{
        setNum(response.data.nombre);
      }
    ).catch((reason)=>{
      setErrMessage("Echec de la requette: "+reason);
      console.log(errMessaage);
    });

  }, []);
  
  return (
    <>
      <h1>Client: real whacher</h1>
      <p>actually the number is: <strong> {num} </strong> </p>

    </>
  );
}

export default App;