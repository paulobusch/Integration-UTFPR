const { NewId } = require('../../utils/database/random');

const EquipamentModel = (sequelize, dataTypes) => {
    const Equipament = sequelize.define('equipament', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        code: {
            type: dataTypes.STRING(10),
            allowNull: false
        },
        is_disponible: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        id_type: {
            type: dataTypes.STRING(8),
            allowNull: false
        },
        removed: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        equipament_created: dataTypes.DATE,
        equipament_updated: dataTypes.DATE
    },{
        createdAt: 'equipament_created',
        updatedAt: 'equipament_updated',
        indexes: [{
            name: 'UQ_code',
            unique: true,
            fields: ['code']
        }]
    });

    return Equipament;
}

module.exports = {
    EquipamentModel
}