const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        bay_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true
        },
        st_id: { type: DataTypes.INTEGER,
            primaryKey: true 
        }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('bay', attributes, options);
}
