const express = require("express");
const app = express();

const db = require("./models");
require('dotenv').config()


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,auth-token"
  );
  res.header(
      "Access-Control-Allow-Methods",
      "*"
  );
  next();
});

const userRoutes = require("./router/user");
const walletRoutes = require("./router/wallet");

db.sequelize.sync()
.then(()=>console.log('Connection has been established successfully.'))
.catch((error)=>console.error('Unable to connect to the database:', error))

app.use("/user", userRoutes);
app.use("/wallet", walletRoutes);

const port = process.env.PORT || 3000;

// db.sequelize.sync().then((res) => {
//   app.listen(port, () => {
//     console.log(`app runing at http://localhost:${port}`);
//   });
// });


app.listen(port, () => {console.log('server run :'+port)})
