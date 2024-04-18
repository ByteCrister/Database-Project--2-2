const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();


/************ session variable setup *************/
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


/*************** Pc cart  Routes Requiring ****************/
const addPCRoutes = require('./routes/Add-pc');
const PcCartsRouters = require('./routes/Pc-Carts');
const UpdatePc = require('./routes/Update-pc');
const DeletePC = require('./routes/Delete-pc');
const DesktopView = require('./routes/Desktop-views-Routes');


/****************** Brand PC Routes Requiring *************/
const addBrandPcRoutes = require('./routes/Add-brand-pc');
const BrandPcCartsRoutes = require('./routes/Brand-Pc-Carts');
const UpdateBrandPC  = require('./routes/Update-brand-pc');
const DeleteBrandPC = require('./routes/Delete-brand-pc');
const DesktopBrandPcView = require('./routes/Desktop-brand-pc-Routes');


/*******************  Graphics Card Requiring ****************/
const addGraphicsCardRoutes = require('./routes/Add-graphics-card');
const GraphicsCardCartsRoutes = require('./routes/Graphics-Card-Carts-Routes');
const UpdateGraphicsCard = require('./routes/Update-graphics-card');
const DeleteGraphicsCard = require('./routes/Delete-graphics-card');
const DesktopGraphicsCardViews = require('./routes/Desktop-graphics-card-Routes');



/************** required environment setup *****************/
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');



/*************** Home and Authentication Routes ***************/
app.use(homeRoutes);
app.use(logInRoutes);
app.use(adminLogInRoutes);
app.use(signInRoutes);
app.use(homeAfterSignIn);
app.use(logOutRoutes);


/**************** PC Routes ************/
app.use(addPCRoutes);
app.use(PcCartsRouters);
app.use(UpdatePc);
app.use(DeletePC);
app.use(DesktopView);



/***************** Brand Pc Routes **********/
app.use(addBrandPcRoutes);
app.use(BrandPcCartsRoutes);
app.use(UpdateBrandPC);
app.use(DeleteBrandPC);
app.use(DesktopBrandPcView);



/******************* Graphics Card Routes  ***********/
app.use(addGraphicsCardRoutes);
app.use(GraphicsCardCartsRoutes);
app.use(UpdateGraphicsCard);
app.use(DeleteGraphicsCard);
app.use(DesktopGraphicsCardViews);




/*************** Route Related Error Handling *************/
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