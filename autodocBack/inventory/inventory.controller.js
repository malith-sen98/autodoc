const express = require('express');
const router = express.Router();
const Inventory = require('./inventory.service');

  router.get("/", getAll);
  router.get("/:id", findAll);
  router.post("/invupdate", update);

  module.exports = router;

  function findAll(req, res, next) {
    Inventory.getById(req.params.id)
        .then(inventory => inventory ? res.json(inventory) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
    Inventory.getAll()
      .then(inventory => res.json(inventory))
      .catch(next);
}

function update(req, res, next) {
  console.log(req.body);
  Inventory.update(req.body)
      .then(() => res.json({ message: 'Items updated successfully.' }))
      .catch(next);
}