const express = require('express');

const model = require('../model/nombre.model');

const router = express.Router();



  // ceci est unpeu notre model et notre base donnée. c'est le chiffre qui vas changer

// router.
router.get('/', (req, res)=>{
    console.log("the number is sent");
    res.status(200).json({
        nombre: model.getNombre()
    });
});


router.post('/changeTo', (req, res)=>{
    console.log("the number has changed");

    res.status(200).json({
        nombre: model.getNombre(),
        description: "askip le nbre a change hein"
    });
});

module.exports = router;