const path = require('path');
const dataBase = require('../../models/DB');

exports.getRamCarts = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const sql2 = 'SELECT * FROM ram_informations';

        dataBase.query(sql2, (err, data) => {
            if (err) {
                console.error('Error fetching Ram information:', err);
                response.status(500).json({ message: 'Internal Server Error' });
            } else {
                if (data.length > 0) {
                    console.log(data[0].product_image_path);
                }
                response.render(path.join(__dirname, '../../public/ram_carts'), { RamList: data });

            }
        });

    }
};