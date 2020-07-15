module.exports = {
  HOST: "bmn-web.jinr.ru",
  USER: "calendar",
  PASSWORD: "calendar",
  DB: "calendartest",
  dialect: "postgres",
  port: "8443",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
