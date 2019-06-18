const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

// Setting up Local if cluster is not available.
// 1. Download MongoDB MSI
// 2. Create C:/data/log C:data/db
// 3. Update local config
// systemLog:
//     destination: file
//     path: c:\data\log\mongod.log
// storage:
//     dbPath: c:\data\db
// 4. run mongod.exe --config [dir of mongod.cfg]
// 5. Create Local User
// db.createUser({user:'admin', pwd:'dummy', roles:[
//   {role:'readWrite', db:'node-angular'}
// ]});

// MongoDB Cluster URL
const dbUrl = 'mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW +
'@cluster1-ojzmt.mongodb.net/node-angular?retryWrites=true&w=majority';
// const dbUrl = 'mongodb://admin1:' +
// process.env.MONGO_ATLAS_PW +
//  '@127.0.0.1:27017'

mongoose.connect(
  dbUrl
  // ,
  // {
  //   useNewUrlParser: true
  // }
).then(() => {
  console.log('Connected to database!');
})
  .catch((err) => {
    console.log('Connection failed!', err.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Any requests targeting /images will be allowed to continue.
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
