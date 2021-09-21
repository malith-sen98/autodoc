const express = require('express');
const router = express.Router();
const ServiceStationServices = require('./servicestationservices.service');

  router.get("/", getAll);
  router.get("/:id", findAll);
  router.post("/insert", insert);
  router.delete('/:id', _delete);

  module.exports = router;

  function findAll(req, res, next) {
    ServiceStationServices.getById(req.params.id)
        .then(servicestationservice => servicestationservice ? res.json(servicestationservice) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
  ServiceStationServices.getAll()
      .then(servicestationservice => res.json(servicestationservice))
      .catch(next);
}

function insert(req, res, next) {
  ServiceStationServices.insert(req.body)
      .then(() => res.json({ message: 'Inserted services succefullty' }))
      .catch(next);
}

function _delete(req, res, next) {
  ServiceStationServices.delete(req.params.id)
      .then(() => res.json({ message: 'Service deleted successfully' }))
      .catch(next);
}