const path = require('path');
const bcrypt = require('bcrypt');
const dataBase = require('../../models/DB');

exports.getAdmin = (request, response) => {
    response.sendFile(path.join(__dirname + '/../../views/adminLogIn.html'));

}




exports.postAdmin = (request, response) => {
    const adminName = request.body.adminName;
    const adminPassword = request.body.adminPassword;

    // const password = await bcrypt.hash(request.body.adminPassword, 10);

    // dataBase.query('insert into admin_information (admin_name, admin_password) values(?,?)', [adminName, password], (e,d)=>{});

    // dataBase.query('SELECT admin_password FROM admin_information WHERE admin_name = ?;',[adminName], async (e,d)=>{
    //     bcrypt.compare(adminPassword, d[0].admin_password, (err, result) => {
    //         if (err) {
    //             console.error('Error comparing passwords:', err);
    //             // Handle the error appropriately
    //         } else {
    //             // Check the result of the comparison
    //             console.log(result+" "+d[0].admin_password);
    //         }
    //     });
        
    // })



    const adminNameAndPasswordSql = 'SELECT admin_password FROM admin_information WHERE admin_name = ?;';
    dataBase.query(adminNameAndPasswordSql, [adminName], (error, data) => {
        if (error) {
            console.error('Error retrieving hashed password from database:', error);
            response.status(500).json({ success: false, message: 'Internal Server Error' });
            return;
        }

        if (data.length === 0) {
            console.log('Admin not found:', adminName);
            response.json({ success: false });
            return;
        }

            if (data[0].admin_password == adminPassword) {
                // Passwords match
                // Proceed with the login process
                request.session.isAdminLoggedIn = true;
                request.session.isLoggedIn = false;
                request.session.userId = adminName;
                console.log('Admin logged In - User ID: ' + request.session.userId);
                response.json({ success: true });
            } else {
                // Passwords do not match
                console.log('Invalid admin credentials:', adminPassword);
                response.json({ success: false });
            }
        
    });
};
