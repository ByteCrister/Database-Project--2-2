const { getSignIn , postSignIn} = require('../../controllers/Home-Controllers/signInRoutesControllers');
const signInRouters = require('express').Router();


signInRouters.get('/signIn', getSignIn);
signInRouters.post('/signIn', postSignIn);

module.exports = signInRouters;