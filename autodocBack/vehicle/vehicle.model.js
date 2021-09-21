const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        vehicle_number: { 
            type: DataTypes.STRING, 
            primaryKey: true,
        },
        model: { type: DataTypes.STRING, allowNull: false },
        make: { type: DataTypes.STRING, allowNull: false },
        reg_year: { type: DataTypes.DATEONLY, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        mileage: { type: DataTypes.INTEGER, allowNull: false },
        vehicle_img_name: { type: DataTypes.STRING, allowNull: false },
        owner_id: { type: DataTypes.INTEGER, allowNull: false },
        
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('vehicle', attributes, options);
}
