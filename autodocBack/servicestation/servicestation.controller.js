const express = require('express');
const router = express.Router();
const ServiceStation = require('./servicestation.service');

router.get("/", getLast);

  router.get("/:id", findAll);

  router.put('/:id', update);
  router.get('/em/:email', findSer);

  module.exports = router;

  function findAll(req, res, next) {
    ServiceStation.getById(req.params.id)
        .then(servicestation => servicestation ? res.json(servicestation) : res.sendStatus(404))
        .catch(next);
}

function findSer(req, res, next) {
  ServiceStation.getByEmail(req.params.email)
      .then(servicestation => servicestation ? res.json(servicestation) : res.sendStatus(404))
      .catch(next);
}

function getLast(req, res, next) {
  ServiceStation.getLast()
    .then(servicestation => servicestation ? res.json(servicestation) : res.sendStatus(404))
    .catch(next);
}

function update(req, res, next) {
  ServiceStation.update(req.params.id, req.body)
      .then(servicestation => res.json(servicestation))
      .catch(next);
}