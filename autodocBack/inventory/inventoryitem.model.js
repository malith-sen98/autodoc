const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        item_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        item_type: { type: DataTypes.STRING, allowNull: false },
        item_name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        st_id: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('inventory_items', attributes, options);
}
