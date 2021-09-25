const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        appointment_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        date: { type: DataTypes.DATE, allowNull: false },
        time: { type: DataTypes.TIME, allowNull: false },
        reminder: { type: DataTypes.INTEGER, allowNull: false },
        duration_hrs:  { type: DataTypes.DECIMAL(11,1), allowNull: false },
        st_id: { type: DataTypes.INTEGER, allowNull: false },
        bay_id: { type: DataTypes.INTEGER, allowNull: false },
        vehicle_number: { type: DataTypes.STRING, allowNull: false },
        isOnline: { type: DataTypes.INTEGER, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('appointment', attributes, options);
}
