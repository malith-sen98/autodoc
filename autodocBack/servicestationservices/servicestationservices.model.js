const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        service_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
        },
        st_id: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        duration_hrs: { type: DataTypes.DECIMAL(11,1), allowNull: false }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('servicestation_services', attributes, options);
}
