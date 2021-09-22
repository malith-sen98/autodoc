const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById,
  getLast,
  update, 
  getByEmail
};

async function getById(id) {
  const servicestation = await db.ServiceStation.findAll({  where: { st_id: id } });
  return servicestation.map(x => basicDetails(x));
}

async function getByEmail(email) {
  const servicestation = await db.ServiceStation.findAll({  where: { email: email } });
  return servicestation.map(x => basicDetails(x));
}

async function getAll() {
  const servicestation = await db.ServiceStation.findAll();
  return servicestation.map(x => basicDetails(x));
}

async function getLast() {
  const servicestation = await db.ServiceStation.findAll({ limit: 1, order: [ [ 'st_id', 'DESC' ]] });
  return servicestation;
}

async function update(id, params) {
  const servicestation = await db.ServiceStation.findOne({  where: { st_id: id } });

  Object.assign(servicestation, params);
  await servicestation.save();

  return basicDetails(servicestation);
}

function basicDetails(servicestation) {
  const { st_id, firstName, lastName, st_name, address, town, email, mobile } = servicestation;
  return { st_id, firstName, lastName, st_name, address, town, email, mobile };
}