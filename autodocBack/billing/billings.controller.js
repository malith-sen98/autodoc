const express = require('express');
const router = express.Router();
const Billing = require('./billing.service');
const multer  = require('multer');
const fs = require('fs');

var store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../autodocsys/autodoc/src/assets/invoice/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage: store });

  router.get("/", getAll);
  router.get("/:id", findAll);
  router.post('/create-bill', insertBill);
  router.post('/upload',upload.single("blob"), function(req,res){
    console.log(req.file);
    res.json({ message: 'Bill Stored Successfully' })
  });
  router.delete('/:id', _delete);

  module.exports = router;



  function findAll(req, res, next) {
    Billing.getById(req.params.id)
        .then(bill => bill ? res.json(bill) : res.sendStatus(404))
        .catch(next);
}

function getAll(req, res, next) {
  Billing.getAll()
      .then(bill => res.json(bill))
      .catch(next);
}

function insertBill(req, res, next) {
  Billing.insertBill(req.body)
        .then(() => res.json({ message: 'Bill Inserted Successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
  Billing.delete(req.params.id)
      .then(() => res.json({ message: 'Bill deleted successfully' }))
      .catch(next);
}

function storeBill(req, res, next) {
        var pdfBuffer = req.file.buffer;
        var pfdName = '../../autodoc/src/assets/pic/invoice.pdf';
        fs.createWriteStream(pfdName).write(pdfBuffer);
        res.json({ message: 'Bill Stored Successfully' })
        
}