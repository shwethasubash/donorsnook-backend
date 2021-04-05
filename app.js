var express = require('express')
var cors = require('cors')
var nm = require('nodemailer')
var app = express()

var userMngRouter = require('./api/routes/UserMngRouter')

app.use(express.json());
app.use(cors())

app.use("/usermng", userMngRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening on port....' + port));
