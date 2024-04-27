const path = require('path');
const bcrypt = require('bcrypt');
const dataBase = require('../../models/DB');

exports.getSignIn = (request, response) => {
    response.sendFile(path.join(__dirname + "/../../views/signIn.html"));
};



exports.postSignIn = async  (request, response) => {
    try {
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const email = request.body.email;

        const password = await bcrypt.hash(request.body.password, 10);

        const signInSql = 'SELECT email FROM users WHERE email=?';
        dataBase.query(signInSql, [email], (error, returnEmail) => {
            if (error) {
                console.log(error);
                response.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
                if (returnEmail.length === 0) {

                    const insertUserInfoSql = 'INSERT INTO users (first_name, last_name, email, email_password, sign_In_time, sign_In_date) VALUES (?, ?, ?, ?, CURRENT_TIME, CURRENT_DATE)';
                    dataBase.query(insertUserInfoSql, [firstName, lastName, email, password], (error, data) => {
                        if (error) {
                            console.log(error);
                            response.status(500).json({ success: false, message: 'Internal Server Error' });
                        } else {
                            // Insertion successful
                            request.session.isLogOut = false;
                            request.session.isAdminLoggedIn = false;

                            request.session.isLoggedIn = true;
                            request.session.userId = data.insertId;
                            console.log('New user entered successfully - User ID : ' + data.insertId);
                            response.json({ success: true });
                           

                        }
                    });
                } else {
                    // Email already exists, handle accordingly
                    console.log('Email already exists:', returnEmail[0].email);
                    response.json({ success: false });
                }
            }
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
