const path = require('path');
const dataBase = require('../../models/DB');

exports.getLogIn = (request, response) => {
    response.sendFile(path.join(__dirname + '/../../views/logIn.html'));

};

exports.postLogIn = (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const findEmailAndPasswordSql = 'SELECT user_id, email, email_password, user_id FROM users WHERE email=? AND email_password=?';
        dataBase.query(findEmailAndPasswordSql, [email, password], (error, data) => {
            if (error) {
                console.log(error);
                response.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
                if (data && data.length > 0 && data[0].email === email && data[0].email_password === password) {

                    request.session.isLogOut = false;
                    request.session.isAdminLoggedIn = false;

                    request.session.isLoggedIn = true;

                    request.session.userId = data[0].user_id;
                    console.log('Old user successfully logged in  - User ID : ' + request.session.userId);
                    response.json({ success: true });
                } else {
                    console.log('User entered wrong info : ' + email + ', ' + password);
                    response.json({ success: false });
                }
            }
        })

    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};