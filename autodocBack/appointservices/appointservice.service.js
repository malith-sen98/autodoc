const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById
};

async function getById(id) {
  const appointservice = await db.AppointService.findAll({  where: { appointment_id: id } });
  return appointservice.map(x => basicDetails(x));
}

async function getAll() {
  const appointservice = await db.AppointService.findAll();
  return appointservice.map(x => basicDetails(x));
}

function basicDetails(appointservice) {
  const { appointment_id, service_id } = appointservice;
  return { appointment_id, service_id };
}