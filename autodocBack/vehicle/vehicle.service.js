const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById,
  update
};

async function getById(vehNo) {
  const vehicle = await db.Vehicle.findAll({  where: { vehicle_number: vehNo } });
  return vehicle.map(x => basicDetails(x));
}

async function getAll(vehNo) {
  const vehicle = await db.Vehicle.findOne({  where: { vehicle_number: vehNo } });
  return vehicle;
}

async function update(id, { vehmil }) {
  const vehicle = await getAll(id);

  vehicle.millage = vehmil;

  await vehicle.save();
}

function basicDetails(vehicle) {


  const { vehicle_number, model, make, reg_year, type, mileage, vehicle_img_name, owner_id, owner_name   } = vehicle;
  return { vehicle_number, model, make, reg_year, type, mileage, vehicle_img_name, owner_id, owner_name  };
}