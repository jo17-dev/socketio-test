const express = require('express');

const router = express.Router();



let nombre = 14; // ceci est unpeu notre model et notre base donnée. c'est le chiffre qui vas changer

// router.
router.get('/', (req, res)=>{
    console.log("the number is sent");
    nombre++;
    res.status(200).json({
        nombre: nombre
    });
});


router.post('/changeTo', (req, res)=>{
    console.log("the number has changed");
    // console.log();
    nombre = req.body?.nombre;
    res.status(200).json({
        nombre: nombre,
        description: "askip le nbre a change hein"
    });
});

module.exports = router;