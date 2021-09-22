const db = require('_helpers/db');
const { Op } = require('sequelize');
const multer  = require('multer')

module.exports = {
  getAll,
  getById,
  insertBill,
  uploadBill,
  delete: _delete
};

async function getById(id) {
  const bill = await db.Billing.findAll({  where: { st_id: id } });
  return bill.map(x => basicDetails(x));
}

async function getBill(id) {
  const bill = await db.Billing.findByPk(id);
  return bill;
}

async function getAll() {
  const bill = await db.Billing.findAll();
  return bill.map(x => basicDetails(x));
}

async function insertBill(params) {
  const bill = new db.Billing(params);
  await bill.save();
}

async function uploadBill(params) {
  const bill = new db.Billing(params);
  await bill.save();
}

async function _delete(id) {
  const bill = await db.Billing.findByPk(id);
  await bill.destroy();
}

function basicDetails(bill) {
  const { bill_id, description, amount, date, owner_id, st_id, path, appointment_id, type } = bill;
  return { bill_id, description, amount, date, owner_id, st_id, path, appointment_id, type };
}