const { NewId } = require('../../utils/database/random');

const UserModel = (sequelize, dataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true,
        },
        first_name: { 
            type: dataTypes.STRING(30),
            allowNull: false
        },
        last_name: { 
            type: dataTypes.STRING(60),
            allowNull: false
        },
        email: { 
            type: dataTypes.STRING(200),
            allowNull: false
        },
        address: { 
            type: dataTypes.STRING(200),
            allowNull: false
        },
        phone: { 
            type: dataTypes.STRING(20),
            allowNull: false
        },
        cpf: { 
            type: dataTypes.STRING(14),
            allowNull: false
        },
        age: dataTypes.INTEGER,
        is_personal: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        sexo: {
            type: dataTypes.ENUM('M', 'F', 'O'),
            allowNull: false
        },
        login: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        user_created: dataTypes.DATE,
        user_updated: dataTypes.DATE
    },
    {        
        createdAt: 'user_created',
        updatedAt: 'user_updated',
        indexes: [
            {
                name: 'UQ_user_name',
                unique: true,
                fields: ['first_name','last_name']
            },
            {
                name: 'UQ_user_email',
                unique: true,
                fields: ['email']
            },
            {
                name: 'UQ_user_login',
                unique: true,
                fields: ['login']
            }
        ]
    });
  
    return User;
}

module.exports = {
    UserModel
}