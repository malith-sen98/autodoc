const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById,
  register
};

async function getById(id) {
  const vehicleowner = await db.VehicleOwner.findAll({  where: { owner_id: id } });
  return vehicleowner.map(x => basicDetails(x));
}

async function getAll() {
  const vehicleowner = await db.VehicleOwner.findAll();
  return vehicleowner.map(x => basicDetails(x));
}

async function register(params) {

  // create account object
  const vehicleowner = new db.VehicleOwner(params);

  // save account
  await vehicleowner.save();
  
}

function basicDetails(vehicleowner) {


  const { owner_id, first_name, last_name, address, home_town, owner_img_name, email, mobile } = vehicleowner;
  return { owner_id, first_name, last_name, address, home_town, owner_img_name, email, mobile };
}