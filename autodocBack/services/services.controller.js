const express = require('express');
const router = express.Router();
const Services = require('./service.service');

  router.get("/", getAll);
  router.get("/:id", findAll);

  module.exports = router;

  function findAll(req, res, next) {
    Services.getById(req.params.id)
        .then(service => service ? res.json(service) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
  Services.getAll()
      .then(service => res.json(service))
      .catch(next);
}