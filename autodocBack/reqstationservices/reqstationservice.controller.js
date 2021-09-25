const express = require('express');
const router = express.Router();
const ReqStationServices = require('./reqstationservice.service');

  router.get("/", getAll);
  router.get("/:id", findAll);
  router.post("/insert", insert)

  module.exports = router;

  function findAll(req, res, next) {
    ReqStationServices.getById(req.params.id)
        .then(reqstationservice => reqstationservice ? res.json(reqstationservice) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
  ReqStationServices.getAll()
      .then(reqstationservice => res.json(reqstationservice))
      .catch(next);
}

function insert(req, res, next) {
  ReqStationServices.insert(req.body)
      .then(() => res.json({ message: 'Inserted services succefullty' }))
      .catch(next);
}