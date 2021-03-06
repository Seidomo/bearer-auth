'use strict';

const base64 = require('base-64');
const User = require('../models/users-model.js');

module.exports = async (req, res, next) => {
  
  if (!req.headers.authorization) { next('Invalid Login'); }
  
  let basic = req.headers.authorization.split(' ');
  let encodedString = basic.pop();
  let decodedString = base64.decode(encodedString);
  console.log(decodedString);
  let [user, pass] = decodedString.split(':')

  try {
    const validUser =  await User.authenticateBasic(user, pass);
    if(validUser){
      req.user = validUser;
      next();
    }else{
      next('invalid user');
    }
    
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

};