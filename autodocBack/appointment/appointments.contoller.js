const express = require('express');
const router = express.Router();
const Appointments = require('./appointment.service');



  router.get("/", getAll);
  router.get("/:id", getAllbyId);
  //router.get("/:date", findAll);

  module.exports = router;

  function findAll(req, res, next) {
    Appointments.getByDate(req.params.date)
        .then(appointment => appointment ? res.json(appointment) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
    Appointments.getAll()
      .then(appointment => res.json(appointment))
      .catch(next);
}

function getAllbyId(req, res, next) {
  Appointments.getAllbyId(req.params.id)
    .then(appointment => res.json(appointment))
    .catch(next);
}