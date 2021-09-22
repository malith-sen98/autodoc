const express = require('express');
const router = express.Router();
const Bays = require('./bays.service');

//   router.get("/", getAll);
  router.get("/:id", findAll);

  module.exports = router;

  function findAll(req, res, next) {
    Bays.getById(req.params.id)
        .then(bay => bay ? res.json(bay) : res.sendStatus(404))
        .catch(next);
}

