const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        owner_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        home_town: { type: DataTypes.STRING, allowNull: false },
        owner_img_name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        mobile: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('vehicle_owner', attributes, options);
}
