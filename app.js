const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')

const borderParser = require("body-parser");
const UserRouter = require('./api/routes/userRouter');
require('./api/config/db_config');

app.use(morgan('combined'));
app.use(borderParser.urlencoded({extended:false}));
app.use(borderParser.json());

//SET ROUTERS
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use('/user', UserRouter);



module.exports = app;