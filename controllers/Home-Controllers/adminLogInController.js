const path = require('path');
const dataBase = require('../../models/DB');

exports.getAdmin = (request, response) => {
    response.sendFile(path.join(__dirname + '/../../views/adminLogIn.html'));

}
exports.postAdmin = (request, response) => {
    const adminName = request.body.adminName;
    const adminPassword = request.body.adminPassword;

    const adminNameAndPasswordSql = 'SELECT * FROM admin_information;';
    dataBase.query(adminNameAndPasswordSql, (error, data) => {
        if (error) {
            console.log(error);
            response.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            if (adminName == data[0].admin_name && adminPassword == data[0].admin_password) {
                request.session.isAdminLoggedIn = true;
                request.session.isLoggedIn = false;
                request.session.userId = adminName;
                console.log('Admin logged In - User iD : ' + request.session.userId);
                response.json({ success: true });
            } else {
                console.log('Invalid admin credentials:', adminName, adminPassword);
                response.json({ success: false });
            }
        }
    });
};
