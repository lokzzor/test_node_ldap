const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models"); // database

const app = express();
app.use(cors());
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true }));// parse requests of content-type - application/x-www-form-urlencoded

/* Headers */ 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "authorization, X-Requested-With, Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  next();   
});



/* Routes */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

const auth = require('./app/routes/auth.routes');
app.use('/api/auth', auth); 

const first = require('./app/routes/first');
app.use('/api/get', first); 

/* PORT */
const PORT = process.env.PORT || 8080;
db.sequelize.sync({ /* force: true */ }).then(function(){
  app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`); });
})
