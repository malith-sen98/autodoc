const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        st_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        st_name: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        town: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        mobile: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        freezeTableName: true,      
    };

    return sequelize.define('service_station', attributes, options);
}