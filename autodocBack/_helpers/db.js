const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Billing = require('../billing/billing.model')(sequelize);
    db.ServiceStationServices = require('../servicestationservices/servicestationservices.model')(sequelize);
    db.Services = require('../services/service.model')(sequelize);
    db.Vehicle = require('../vehicle/vehicle.model')(sequelize);
    db.ServiceStation = require('../servicestation/servicestation.model')(sequelize);
    db.Appointments = require('../appointment/appointment.model')(sequelize);
    db.VehicleOwner = require('../vehicleowner/vehicleowner.model')(sequelize);
    db.AppointService = require('../appointservices/appointservice.model')(sequelize);
    db.Inventory = require('../inventory/inventoryitem.model')(sequelize);
    db.RequestedStation = require('../requestedstations/requestedstation.model')(sequelize);
    db.ReqStationServices = require('../reqstationservices/reqstationservice.model')(sequelize);
    db.Bays = require('../bays/bays.model')(sequelize);
    
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    
    
    // sync all models with database
    await sequelize.sync();
}