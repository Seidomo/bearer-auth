'use strict';
const jwt = require('jsonwebtoken');
// const users = require('../models/users-model.js')

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { next('Invalid Login') }

  const token = req.headers.authorization.split(' ').pop();

  try {

   
    const validUser = jwt.verify(token, process.env.SECRET);
    if(validUser){
    req.user = validUser;
    req.token = validUser.token;
    next();
  } else{
    next('invali user')
  
  }

    
    
  }catch (e) {
    res.status(403).send('Invalid Login');;
}
};