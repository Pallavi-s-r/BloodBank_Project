const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

dotenv.config();

const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/api/v1', route);

//static file
app.use(express.static(path.join(__dirname,'./client/build')))

//static route
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
app.listen(process.env.PORT , function () {
    console.log(`Express app running ${process.env.DEV_MODE} Modeon port`  + (process.env.PORT ))
});