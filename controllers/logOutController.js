exports.getLogOut = (request, response) => {
    request.session.isLogOut = true;
    request.session.isAdminLoggedIn = false;
    request.session.isLoggedIn = false;
    
    console.log('User ID : '+request.session.userId+" Logged Out");
    request.session.userId = null;
    response.redirect('/');
};