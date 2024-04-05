const path = require('path');
const dataBase = require('../models/DB');

exports.getSignIn = (request, response) => {
    response.sendFile(path.join(__dirname + "/../views/signIn.html"));
};



exports.postSignIn = (request, response) => {
    try {
        const firstName = request.body.firstName;
        const lastName = request.body.lastName;
        const email = request.body.email;
        const password = request.body.password;

        const signInSql = 'SELECT email FROM users WHERE email=?';
        dataBase.query(signInSql, [email], (error, returnEmail) => {
            if (error) {
                console.log(error);
                response.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
                if (returnEmail.length === 0) {
                    const insertUserInfoSql = 'INSERT INTO users (first_name, last_name, email, email_password) VALUES (?, ?, ?, ?)';
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
                            console.log('New user entered successfully - User ID : '+request.session.userId);
                            response.redirect('/');

                        }
                    });
                } else {
                    // Email already exists, handle accordingly
                    console.log('Email already exists:', returnEmail[0].email);
                    response.redirect('/signIn')
                }
            }
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
