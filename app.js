const express = require('express');
const session = require('express-session');
const app = express();


app.use(session({
    secret: '---pc_gallery---',
    resave: false,
    saveUninitialized: true,
}));

/**************** Home Routes Handling *****************/
const homeRoutes = require('./routes/homeBeforeSignInRoutes');
const logInRoutes = require('./routes/logInRoutes');
const adminLogInRoutes = require('./routes/adminLogInRoute');
const signInRoutes = require('./routes/signInRoutes');
const homeAfterSignIn = require('./routes/homeAfterSignInRoute');
const logOutRoutes = require('./routes/logOutRoutes');


/*************** Pc cart  Routes Handling ****************/
const addPCRoutes = require('./routes/Add-pc');
const PcCartsRouters = require('./routes/Pc-Carts');
const UpdatePc = require('./routes/Update-pc');
const DeletePC = require('./routes/Delete-pc');


const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.use(homeRoutes);
app.use(logInRoutes);
app.use(adminLogInRoutes);
app.use(signInRoutes);
app.use(homeAfterSignIn);
app.use(logOutRoutes);
app.use(addPCRoutes);
app.use(PcCartsRouters);
app.use(UpdatePc);
app.use(DeletePC);


app.use((request, response, next)=>{
    response.status(404).send('<h1>Invalid Url 404 !</h1>');
    next();
})
app.use((error, request, response, next) => {
    console.error(error); 
    response.status(500).send('<h1>Server is broken</h1>');
    next();
});

module.exports = app;