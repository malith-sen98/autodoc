const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById
};

async function getById(id) {
  const service = await db.Services.findAll({  where: { service_id: id } });
  return service.map(x => basicDetails(x));
}

async function getAll() {
  const service = await db.Services.findAll();
  return service.map(x => basicDetails(x));
}

function basicDetails(service) {


  const { service_id, service_name, description, duration_hrs } = service;
  return { service_id, service_name, description, duration_hrs };
}