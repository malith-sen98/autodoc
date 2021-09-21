const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
  getAll,
  getById,
  update
};

async function getById(id) {
  const inventory = await db.Inventory.findAll({  where: { st_id: id } });
  return inventory.map(x => basicDetails(x));
}

async function getAll() {
  const inventory = await db.Inventory.findAll();
  return inventory.map(x => basicDetails(x));
}

async function update({invnm, qty}) {
    const inventory = await db.Inventory.findOne({  where: { item_name: invnm } });
    inventory.quantity = inventory.quantity - qty;
    await inventory.save();
}

function basicDetails(inventory) {
  const { item_id, item_type, item_name, quantity, price, st_id } = inventory;
  return { item_id, item_type, item_name, quantity, price, st_id };
}