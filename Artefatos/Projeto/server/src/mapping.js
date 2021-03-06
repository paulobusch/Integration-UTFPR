const Sequelize = require('sequelize');
const { UserModel } = require('./models/users/user.model');
const { EvaluationModel } = require('./models/evaluations/evaluation.model');
const { EquipmentModel } = require('./models/equipment/equipment.model');
const { DietsModel } = require('./models/diets/diets.model');
const { CalendarModel } = require('./models/calendar/calendar.model');
const { TypeModel } = require('./models/equipment/types/type.model');
const { DietTypeModel } = require('./models/diets/types/dietType.model')
const { TrainingModel } = require('./models/training/training.model');
const { ExerciseModel } = require('./models/exercise/exercise.model');

const { DbConfig, DbManager } = require('./../config');
const { PaymentsModel } = require('./models/payments/payments.model');

const Connection = new Sequelize(DbConfig.database, DbConfig.user, DbConfig.password, {
  host: DbConfig.host,
  port: DbConfig.port,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const EquipmentDb = EquipmentModel(Connection, Sequelize);
const DietDb = DietsModel(Connection, Sequelize);
const CalendarDb = CalendarModel(Connection, Sequelize);
const TrainingDb = TrainingModel(Connection, Sequelize);
const ExerciseDb = ExerciseModel(Connection, Sequelize);

const UserDb = UserModel(Connection, Sequelize);
const EvaluationDb = EvaluationModel(Connection, Sequelize);
UserDb.hasMany(EvaluationDb, { foreignKey: 'id_user_avaliador', as: 'avaliador' });
UserDb.hasMany(EvaluationDb, { foreignKey: 'id_user_avaliado', as: 'avaliado' });
EvaluationDb.belongsTo(UserDb, { foreignKey: 'id_user_avaliador', as: 'avaliador' });
EvaluationDb.belongsTo(UserDb, { foreignKey: 'id_user_avaliado', as: 'avaliado' });

const TypeDb = TypeModel(Connection, Sequelize);
TypeDb.hasMany(EquipmentDb, { foreignKey: 'id_type', as: 'type_equipment' });
EquipmentDb.belongsTo(TypeDb, { foreignKey: 'id_type', as: 'type_equipment' });

const DietTypeDb = DietTypeModel(Connection, Sequelize);
DietTypeDb.hasMany(DietDb, { foreignKey: 'id_type_diet', as: 'type_diet' });
DietDb.belongsTo(DietTypeDb, { foreignKey: 'id_type_diet', as: 'type_diet' });

TrainingDb.hasMany(CalendarDb, { foreignKey: 'id_training', as : 'training'});
CalendarDb.belongsTo(TrainingDb, { foreignKey: 'id_training', as : 'training'});
UserDb.hasMany(TrainingDb, {foreignKey: 'id_athlete', as : 'athlete'});
TrainingDb.belongsTo(UserDb, {foreignKey: 'id_athlete', as : 'athlete'}); 
ExerciseDb.belongsTo(TrainingDb, {foreignKey: 'id_exercise', as : 'exercise'});
TrainingDb.hasMany(ExerciseDb, {foreignKey: 'id_exercise', as : 'exercise'});
EquipmentDb.hasMany(ExerciseDb, {foreignKey: 'id_equipment', as : 'equipment'});
ExerciseDb.belongsTo(EquipmentDb, {foreignKey: 'id_equipment', as : 'equipment'});


const PaymentsDb = PaymentsModel(Connection, Sequelize);

Connection.sync({ force: DbManager.overrideData })
  .then(() => console.log(`Tables created!`));

module.exports = { 
  UserDb,
  TypeDb,
  PaymentsDb,
  DietDb,
  DietTypeDb,
  CalendarDb,
  EquipmentDb,
  EvaluationDb, 
  TrainingDb,
  ExerciseDb,
  Connection
};
