const path = require('path');

exports.getHome = (request, response) => {
    if (request.session.isLoggedIn) {
        response.render(path.join(__dirname, '/../public/homeAfterSignIn'));
    } else if (request.session.isAdminLoggedIn) {
        response.render(path.join(__dirname, '/../public/adminHome'));
    } else {
        response.render(path.join(__dirname, '/../public/homeBeforeSignIn'));
    }
};