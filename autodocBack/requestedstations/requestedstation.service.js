const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getLast,
  getById,
  register
};

async function getById(id) {
  const requestedstation = await db.RequestedStation.findAll({  where: { reg_number: id } });
  return requestedstation.map(x => basicDetails(x));
}

async function getLast() {
  const requestedstation = await db.RequestedStation.findAll({ limit: 1, order: [ [ 'reg_number', 'DESC' ]] });
  return requestedstation;
}

async function register(params) {

    // create account object
    const requestedstation = new db.RequestedStation(params);
  
    // save account
    await requestedstation.save();
    
  }

function basicDetails(requestedstation) {
  const { reg_number, firstName, lastName, st_name, address, town, email, mobile, bay_amount } = requestedstation;
  return { reg_number, firstName, lastName, st_name, address, town, email, mobile, bay_amount };
}