const path = require('path');

exports.getHome = (request, response) => {
    if (request.session.isLoggedIn) {
        response.render(path.join(__dirname, '..', '..', 'public','Home.User', 'homeAfterSignIn.ejs'));
    } else if (request.session.isAdminLoggedIn) {
        response.render(path.join(__dirname, '..', '..', 'public','Home.Admin', 'Home', 'adminHome.ejs'));
    } else {
        response.render(path.join(__dirname, '..', '..', 'public', 'Home.User', 'homeBeforeSignIn.ejs'));
    }
};
