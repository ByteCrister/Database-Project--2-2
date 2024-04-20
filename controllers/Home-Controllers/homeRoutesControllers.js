const path = require('path');

exports.getHome = (request, response) => {
    if (request.session.isLoggedIn) {
        response.render(path.join(__dirname, '../../public/homeAfterSignIn.ejs'));
    } else if (request.session.isAdminLoggedIn) {
        response.render(path.join(__dirname, '../../public/adminHome.ejs'));
    } else {
        response.render(path.join(__dirname, '../../public/homeBeforeSignIn.ejs'));
    }
};
