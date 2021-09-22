const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById,
  insert,
  delete: _delete
};

async function getById(id) {
  const servicestationservice = await db.ServiceStationServices.findAll({  where: { st_id: id } });
  return servicestationservice.map(x => basicDetails(x));
}

async function getAll() {
  const servicestationservice = await db.ServiceStationServices.findAll();
  return servicestationservice.map(x => basicDetails(x));
}

async function insert(params) {

  // create account object
  const servicestationservice = new db.ServiceStationServices(params);

  // save account
  await servicestationservice.save();
  
}

async function _delete(id) {
  const servicestationservice = await db.ServiceStationServices.findOne({  where: { service_id: id } });
  await servicestationservice.destroy();
}

function basicDetails(servicestationservice) {


  const { service_id, st_id, amount, duration_hrs } = servicestationservice;
  return { service_id, st_id, amount, duration_hrs };
}