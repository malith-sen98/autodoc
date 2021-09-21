const db = require("_helpers/db");
const { Op } = require("sequelize");

module.exports = {
  getAll,
  getById,
  insert,
};

async function getById(id) {
  const reqstationservice = await db.ReqStationServices.findAll({
    where: { reg_number: id },
  });
  return reqstationservice.map((x) => basicDetails(x));
}

async function getAll() {
  const reqstationservice = await db.ReqStationServices.findAll();
  return reqstationservice.map((x) => basicDetails(x));
}

async function insert(params) {
  // create resserstat object
  for (let x = 0; x<params.length; x++) {
    // console.log(params[x]);
    // const reqstationservice = new db.ReqStationServices(params[x]);
    // await reqstationservice.save();
    const reqstationservice = await db.ReqStationServices.create({ reg_number: params[x].reg_number, service_id: params[x].service_id, amount: params[x].amount, duration: params[x].duration })
  }
}

function basicDetails(reqstationservice) {
  const { reg_number, service_id, amount, duration } = reqstationservice;
  return { reg_number, service_id, amount, duration };
}
