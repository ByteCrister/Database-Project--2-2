const express = require('express');
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const cors = require('cors');
const path = require("path");
require('dotenv').config();

const app = express();

/************ session variable setup *************/
const sessionStore = new MySQLStore({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB,
    clearExpired: true,
    checkExpirationInterval: 900000, // Clear expired sessions every 15 min
    expiration: 86400000, // 1-day session expiration
});

app.use(session({
    secret: process.env.Session_secret,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,  // Set to false for HTTP (only true for HTTPS)
        httpOnly: true, // Prevent JavaScript access
        sameSite: "lax"
    },
}));

/**************** Home Routes Handling *****************/
const homeRoutes = require('./routes/Home-Routes/homeBeforeSignInRoutes');
const logInRoutes = require('./routes/Home-Routes/logInRoutes');
const adminLogInRoutes = require('./routes/Home-Routes/adminLogInRoute');
const signInRoutes = require('./routes/Home-Routes/signInRoutes');
const logOutRoutes = require('./routes/Home-Routes/logOutRoutes');


/*************** Pc cart  Routes Requiring ****************/
const addPCRoutes = require('./routes/Pc-Routes/Add-pc');
const PcCartsRouters = require('./routes/Pc-Routes/Pc-Carts');
const UpdatePc = require('./routes/Pc-Routes/Update-pc');
const DeletePC = require('./routes/Pc-Routes/Delete-pc');
const DesktopView = require('./routes/Pc-Routes/Desktop-views-Routes');


/****************** Brand PC Routes Requiring *************/
const addBrandPcRoutes = require('./routes/Brand-Pc-Routes/Add-brand-pc');
const BrandPcCartsRoutes = require('./routes/Brand-Pc-Routes/Brand-Pc-Carts');
const UpdateBrandPC = require('./routes/Brand-Pc-Routes/Update-brand-pc');
const DeleteBrandPC = require('./routes/Brand-Pc-Routes/Delete-brand-pc');
const DesktopBrandPcView = require('./routes/Brand-Pc-Routes/Desktop-brand-pc-Routes');


/*******************  Graphics Card Requiring ****************/
const addGraphicsCardRoutes = require('./routes/Graphics-Card-Routes/Add-graphics-card');
const GraphicsCardCartsRoutes = require('./routes/Graphics-Card-Routes/Graphics-Card-Carts-Routes');
const UpdateGraphicsCard = require('./routes/Graphics-Card-Routes/Update-graphics-card');
const DeleteGraphicsCard = require('./routes/Graphics-Card-Routes/Delete-graphics-card');
const DesktopGraphicsCardViews = require('./routes/Graphics-Card-Routes/Desktop-graphics-card-Routes');


/******************* Ram Module Requiring ***********************/
const addRamRoutes = require('./routes/Ram-Routes/Add-ram');
const RamCartsRoutes = require('./routes/Ram-Routes/Ram-Carts-Routes');
const UpdateRam = require('./routes/Ram-Routes/Update-ram');
const DeleteRam = require('./routes/Ram-Routes/Delete-ram');
const DesktopRamViews = require('./routes/Ram-Routes/Desktop-Ram-Views-Routes');





/****************** Desktop View Requiring  *******************/
const DesktopViewRoutes = require('./routes/Desktop-View-Routes/Desktop-View-Router');


const DesktopViewQuestionRoutes = require('./routes/Desktop-View-Routes/Desktop-View-Question-Routes');
const DesktopQuestionPostRoutes = require('./routes/Desktop-View-Routes/Desktop-Question-Post');
const DesktopReviewPostRouter = require('./routes/Desktop-View-Routes/Desktop-Review-Post');


const AdminQuestionRoutes = require('./routes/Desktop-View-Routes/Admin-Question-Replay');
const viewSellingHistoryRoutes = require('./routes/Desktop-View-Routes/Selling-history');
const userRatingsRoutes = require('./routes/Desktop-View-Routes/Desktop-ratings');
const userQuestionsRoutes = require('./routes/Desktop-View-Routes/Desktop-questions');
const adminQuestionUpdates = require('./routes/Desktop-View-Routes/Admin-question-update');
const adminHomeViewRoutes = require('./routes/Desktop-View-Routes/Admin-Home-View');
const usersViewRoutes = require('./routes/Desktop-View-Routes/Users.view');



/************** required environment setup *****************/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


// app.get('/', (req, res) => {
//     res.send('Welcome to the Home Page');
// });
/*************** Home and Authentication Routes ***************/
app.use(homeRoutes);
app.use(logInRoutes);
app.use(adminLogInRoutes);
app.use(signInRoutes);
app.use(logOutRoutes);
app.use(require('./routes/Home-Routes/confirm'));

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




/******************* Ram Routes *********************/
app.use(addRamRoutes);
app.use(RamCartsRoutes);
app.use(UpdateRam);
app.use(DeleteRam);
app.use(DesktopRamViews);




/******************* Desktop Routes ************/
app.use(DesktopViewRoutes);
app.use(DesktopViewQuestionRoutes);
app.use(DesktopQuestionPostRoutes);
app.use(DesktopReviewPostRouter);


app.use(AdminQuestionRoutes);
app.use(viewSellingHistoryRoutes);
app.use(userRatingsRoutes);
app.use(userQuestionsRoutes);
app.use(adminQuestionUpdates);
app.use(adminHomeViewRoutes);
app.use(usersViewRoutes);

app.use(require('./routes/Desktop-View-Routes/Product-Hide-Route'));
app.use(require('./routes/Desktop-View-Routes/Advertisements'));
app.use(require('./routes/Desktop-View-Routes/TextUpdate'));



/*************** Route Related Error Handling *************/
app.use((request, response, next) => {
    response.status(404).send('<h1>Invalid Url 404 !</h1>');
    next();
})
app.use((error, request, response, next) => {
    console.error(error);
    response.status(500).send('<h1>Server is broken</h1>');
    next();
});

module.exports = app;