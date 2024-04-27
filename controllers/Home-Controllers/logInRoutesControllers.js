const path = require('path');
const bcrypt = require('bcrypt');

const dataBase = require('../../models/DB');

exports.getLogIn = (request, response) => {
    response.sendFile(path.join(__dirname + '/../../views/logIn.html'));

};

exports.postLogIn = async (request, response) => {
    try {
        const email = request.body.email;
        const password = request.body.password;

        const findEmailAndPasswordSql = 'SELECT email, email_password, user_id FROM users WHERE email=?';
        dataBase.query(findEmailAndPasswordSql, [email], async (error, data) => {
            if (error) {
                console.log(error);
                response.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {

                const passwordMatch = await bcrypt.compare(password, data[0].email_password);

                if (passwordMatch) {

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