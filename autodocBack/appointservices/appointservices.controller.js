const express = require('express');
const router = express.Router();
const AppointService = require('./appointservice.service');

  router.get("/", getAll);
  router.get("/:id", findAll);

  module.exports = router;

  function findAll(req, res, next) {
    AppointService.getById(req.params.id)
        .then(appointservice => appointservice ? res.json(appointservice) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
    AppointService.getAll()
      .then(appointservice => res.json(appointservice))
      .catch(next);
}