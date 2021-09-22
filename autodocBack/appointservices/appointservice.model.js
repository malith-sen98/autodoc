const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        appointment_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
        },
        service_id: { type: DataTypes.INTEGER, allowNull: false },
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('appointment_service', attributes, options);
}
