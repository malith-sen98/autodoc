const express = require('express');
const router = express.Router();
const Vehicle = require('./vehicle.service');



  // Retrieve all Tutorials
  // router.get("/", findAll);

  // Retrieve all published Tutorials
  router.get("/", getAll);

  // Retrieve a single Tutorial with id
  router.get("/:vehNo", findAll);
  router.put('/:id', update);

  module.exports = router;

  function findAll(req, res, next) {
    Vehicle.getById(req.params.vehNo)
        .then(vehicle => vehicle ? res.json(vehicle) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
  Vehicle.getAll()
      .then(vehicle => res.json(vehicle))
      .catch(next);
}

function update(req, res, next) {
  Vehicle.update(req.params.id, req.body)
      .then(() => res.json({ message: 'Millage updated successfully.' }))
      .catch(next);
}