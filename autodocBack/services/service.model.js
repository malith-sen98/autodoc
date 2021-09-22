const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        service_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        service_name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        duration_hrs: { type: DataTypes.DECIMAL(11,1), allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('services', attributes, options);
}
