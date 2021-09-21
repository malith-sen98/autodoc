const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        userType: { type: DataTypes.STRING, allowNull: false },
        verificationToken: { type: DataTypes.STRING },
        verified: { type: DataTypes.DATE },
        resetToken: { type: DataTypes.STRING },
        resetTokenExpires: { type: DataTypes.DATE },
        passwordReset: { type: DataTypes.DATE },
        isVerified: {
            type: DataTypes.VIRTUAL,
            get() { return !!(this.verified || this.passwordReset); }
        },
        isAccepted: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        timestamps: false, 
        defaultScope: {
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            withHash: { attributes: {}, }
        },
        freezeTableName: true,        
    };

    return sequelize.define('accounts', attributes, options);
}