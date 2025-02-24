const path = require('path');
const bcrypt = require('bcrypt');

const dataBase = require('../../models/DB');

exports.getLogIn = (request, response) => {
    response.sendFile(path.join(__dirname + '/../../views/logIn.html'));

};

exports.postLogIn = async (request, response) => {
    try {
        const email = request.body.email.trim();
        const password = request.body.password.trim();


        dataBase.query(`select * from admin_information where admin_no = 0`, async (error, data1) => {

            const adminMatch = await bcrypt.compare(email, data1[0].admin_name);
            const AdminPasswordMatch = await bcrypt.compare(password, data1[0].admin_password);

            if (AdminPasswordMatch && adminMatch) {
                request.session.isAdminLoggedIn = true;
                request.session.isLoggedIn = false;
                request.session.userId = email;
                console.log('Admin logged In');
                response.json({ success: true });

            } else {
                const findEmailAndPasswordSql = 'SELECT email, email_password, user_id FROM users WHERE email=?';
                dataBase.query(findEmailAndPasswordSql, [email], async (error, data) => {
                    if (error) {
                        console.log(error);
                        response.status(500).json({ success: false, message: 'Internal Server Error' });
                    } else {
                        // Check if any data is returned
                        if (data.length > 0) {
                            const passwordMatch = await bcrypt.compare(password, data[0].email_password);

                            if (passwordMatch) {
                                request.session.isLogOut = false;
                                request.session.isAdminLoggedIn = false;
                                request.session.isLoggedIn = true;
                                request.session.userId = data[0].user_id;
                                console.log('Old user successfully logged in  - User ID : ' + request.session.userId);
                                request.session.save((err) => {
                                    if (err) {
                                        console.error("Session Save Error:", err);
                                    }
                                    response.json({ success: true });
                                });
                            } else {
                                console.log('User entered wrong info : ' + email + ', ' + password);
                                response.json({ success: false });
                            }
                        } else {
                            // No user found with the provided email
                            console.log('No user found with email: ' + email);
                            response.json({ success: false, message: 'Invalid email or password' });
                        }
                    }
                });
            }
        });



    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
