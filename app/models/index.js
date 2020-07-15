const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port,
    operatorsAliases: 1,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.secret="secretcode user";

db.user = require('../models/user.js')(sequelize, Sequelize);
db.event = require('../models/event.js')(sequelize, Sequelize);
db.room = require('../models/room.js')(sequelize, Sequelize);
db.dictionary = require('../models/event_dictionary.js')(sequelize, Sequelize);
db.room.belongsTo(db.event, {
  through: "room_name",
  foreignKey: "room_name",
});

module.exports = db;
