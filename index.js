require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL, (err) => {
  if (err) console.log(err)
  else console.log('mongdb is connected')
})
mongoose.connection.on('error', (err) => {
  console.log('err', err)
})
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected')
})


const userAuth = require("./routes/auth.user.route");
const homeRouter = require('./routes/home.route');



app.use('/user', userAuth);
app.use(  homeRouter  );



app.listen(process.env.PORT, () => {
  console.log(`Socail Media backend server is started on http://localhost:${process.env.PORT}`)
})