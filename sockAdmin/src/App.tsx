import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';

const App = ()=>{
  const [num, setNum] = useState(0);
  const [target, setTarget] = useState(0);

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

  const handleClick = async (e:any)=>{
    console.log("cliqued " + target)

    axios({
      method: 'post',
      url: "http://localhost:500/changeTo/",
      data: {"nombre": target}  
    })
      .then((response) => {
        console.log("Requête effectuée");
        console.log(response);
      })
      .catch((reason) => {
        setErrMessage("Échec de la requête: " + reason);
        console.log(errMessaage);
      });
  }


  const handleChange = (e: any) =>{
    console.log("pre-target: ", e.target.value)
    if(e.target.value != ""){
      setTarget(parseInt(e.target.value));
    }
  }

  return (
    <>
      <h1>ADmin:</h1>
      <p>actually the number is: <strong> {num} </strong> </p>
      <input type="number" name="nbre" value={target} id="nbre" onChange={handleChange} />
      <button onClick={handleClick} >changer</button>
    </>
  );
}

export default App;