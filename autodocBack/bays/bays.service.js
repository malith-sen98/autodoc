const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getById
};

async function getById(id) {
  const bay = await db.Bays.findAll({  where: { st_id: id } });
  return bay.map(x => basicDetails(x));
}

function basicDetails(bay) {
  const { bay_id, st_id } = bay;
  return { bay_id, st_id };
}