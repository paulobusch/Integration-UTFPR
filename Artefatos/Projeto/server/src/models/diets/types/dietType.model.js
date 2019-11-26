const { NewId } = require('../../../utils/database/random');

const DietTypeModel = (sequelize, dataTypes) => {
    const dietType = sequelize.define('tipo_dieta', {
        id: {
            type: dataTypes.STRING(8),
            defaultValue: NewId,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    });
    
    return dietType;

}

module.exports = {
    DietTypeModel
};