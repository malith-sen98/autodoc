const express = require('express');
const router = express.Router();
const VehicleOwner = require('./vehicleowner.service');

  router.get("/", getAll);
  router.get("/:id", findAll);
  router.post("/register", register);

  module.exports = router;

  function findAll(req, res, next) {
    VehicleOwner.getById(req.params.id)
        .then(vehicleowner => vehicleowner ? res.json(vehicleowner) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
    VehicleOwner.getAll()
      .then(vehicleowner => res.json(vehicleowner))
      .catch(next);
}

function register(req, res, next) {
  VehicleOwner.register(req.body)
      .then(() => res.json({ message: 'Registration successful of Vehicle Owner' }))
      .catch(next);
}