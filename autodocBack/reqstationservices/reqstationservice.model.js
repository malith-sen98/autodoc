const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        reg_number: { 
            type: DataTypes.STRING, 
            primaryKey: true,
        },
        service_id: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        duration: { type: DataTypes.DECIMAL(11,1), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        freezeTableName: true,
    };

    return sequelize.define('requested_station_services', attributes, options);
}