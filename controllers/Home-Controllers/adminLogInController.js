const path = require('path');
const bcrypt = require('bcrypt');
const dataBase = require('../../models/DB');

exports.getAdmin = (request, response) => {
    response.sendFile(path.join(__dirname + '/../../views/adminLogIn.html'));

}




exports.postAdmin = async  (request, response) => {
    const adminName = request.body.adminName.trim();
    const adminPassword = request.body.adminPassword.trim();
    console.log(adminName + "    " + adminPassword);

    const password = await bcrypt.hash(adminPassword, 10);
    const admin = await bcrypt.hash(adminName, 10);
    dataBase.query('update admin_information set admin_name = ?, admin_password = ? where admin_no = 0 ', [admin, password], (e,d)=>{});


    // dataBase.query('SELECT * FROM admin_information;',  async(e, d) => {
    //     if (e) {
    //         console.error('Error retrieving hashed password from database:', error);
    //         response.json({ success: false });

    //     } else {
    //         const passwordMatch = await bcrypt.compare(adminPassword, d[0].admin_password);
    //         const adminMatch = await bcrypt.compare(adminName, d[0].admin_name);

    //         if (passwordMatch && adminMatch) {
    //             request.session.isAdminLoggedIn = true;
    //             request.session.isLoggedIn = false;
    //             request.session.userId = adminName;
    //             console.log('Admin logged In');
    //             response.json({ success: true });
    //         } else {
    //             console.log('Invalid admin credentials:');
    //             response.json({ success: false });
    //         }

    //     }
    // });

};
