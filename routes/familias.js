const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/familias').get(async function(req, res) {
  const familiasSnapshot = await db.collection('familias').get();
  const familias = [];
  familiasSnapshot.forEach(familia => {
    familias.push({
      id: familia.id,
      nombre: familia.data().nombre
    });
  });
  res.json(familias);
});

router.route('/familias').post(async function(req, res) {
  if(jwt.validateToken){
    const familia = {
      nombre: req.body.nombre
    };
    const docRef = await db.collection('familias').add(familia);

    res.json({message: 'Familia creada', id: docRef.id});
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/familia/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const familia = {
      nombre: req.body.nombre
    };

    await db.collection('familias').doc(req.params.id).set(familia);

    res.json({ message: 'Familia actualizada' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/familia/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('familias').doc(req.params.id).delete();

    res.json({ message: 'Familia eliminada' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
