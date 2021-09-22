const express = require('express');
const router = express.Router();
const RequestedStation = require('./requestedstation.service');
const multer  = require('multer');

var store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../autodocsys/autodoc/src/assets/img/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage: store });

  router.get("/", getLast);

  router.get("/:id", findAll);

  router.post("/register", register);

  router.post('/upload',upload.single("pdf"), function(req,res){
    console.log(req.file);
    res.json({ message: 'BR stored Successfully' })
  });


  module.exports = router;

  function findAll(req, res, next) {
    RequestedStation.getById(req.params.id)
        .then(requestedstation => requestedstation ? res.json(requestedstation) : res.sendStatus(404))
        .catch(next);
}

function getLast(req, res, next) {
    RequestedStation.getLast()
      .then(requestedstation => requestedstation ? res.json(requestedstation) : res.sendStatus(404))
      .catch(next);
}

function register(req, res, next) {
    RequestedStation.register(req.body)
        .then(() => res.json({ message: 'Requested was successfully sent of service station registration' }))
        .catch(next);
  }