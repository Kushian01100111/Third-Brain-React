const passport = require('passport')
const express =  require('express')

exports.googleLogin= passport.authenticate('google', { scope: ['email','profile']})