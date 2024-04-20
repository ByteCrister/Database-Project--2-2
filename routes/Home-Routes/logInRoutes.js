const { getLogIn, postLogIn } = require('../../controllers/Home-Controllers/logInRoutesControllers');
const logInRoute = require('express').Router();


logInRoute.get('/logIn', getLogIn);
logInRoute.post('/logIn', postLogIn);


module.exports = logInRoute;