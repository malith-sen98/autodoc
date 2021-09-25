const db = require('_helpers/db');
const { Op } = require('sequelize');
const moment = require('moment');

module.exports = {
  getAll,
  getByDate,
  getAllbyId
};


async function getByDate(date) {
  const appointment = await db.Appointments.findAll({  where: { date: date } });
  return appointment.map(x => basicDetails(x));
}

async function getAll() {
  //date = moment().format("YYYY-MM-DD");
  const appointment = await db.Appointments.findAll();
  return appointment.map(x => basicDetails(x));
}

async function getAllbyId(id) {
  //date = moment().format("YYYY-MM-DD");
  const appointment = await db.Appointments.findAll({  where: { st_id: id } });
  return appointment.map(x => basicDetails(x));
}

function basicDetails(appointment) {


  const {appointment_id, date, time, reminder, duration_hrs, st_id, bay_id, vehicle_number, isOnline } = appointment;
  return {appointment_id, date, time, reminder, duration_hrs, st_id, bay_id, vehicle_number, isOnline };
}

async function sendVerificationEmail(emailAttrs, email) {
  let message;

  message = `<p>Your appointment has been confirmed. Please check below info.</p>
             <h2> Appointment Confirmation </h2>
             <p><b>Bay Number: </b> ${emailAttrs[1]}</p>
             <p><b>Duration: </b> ${emailAttrs[2]}</p>
             <p><b>Date & Time: </b> ${emailAttrs[3]}</p>
             <p><b>Vehicle Number: </b> ${emailAttrs[4]}</p>`;
  
  let services = '';

  for(let x = 0; x< emailAttrs[6].length; x++)
  {
    services = services + emailAttrs[6][x] + ', '
  }


  await sendEmail({
      to: email,
      subject: 'Appointment Confimation - AutoDoc',
      html: `<h4>AutoDoc Online Appointment Confirmation</h4>
             ${message}
             <h2> Services Selected </h2>
             ${services}`
  });
}