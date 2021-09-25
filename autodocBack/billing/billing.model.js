
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        bill_id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
        },
        description: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.INTEGER, allowNull: false },
        date: { 
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
            allowNull: false },
        owner_id: { type: DataTypes.INTEGER, allowNull: false },
        st_id: { type: DataTypes.INTEGER, allowNull: false },
        path: { type: DataTypes.STRING, allowNull: false },
        appointment_id: { type: DataTypes.INTEGER, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        freezeTableName: true,
    };

    return sequelize.define('bill', attributes, options);
}