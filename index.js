'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js')

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};
mongoose.connect(process.env.MONGODB_URI, options)
         .then(() => {
          // Start the web server
server.start(process.env.PORT);
         }).catch(e => console.error('Not Found', e.message));


