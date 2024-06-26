const path = require('path');
const dataBase = require('../../models/DB');

exports.getBrandPcCarts = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const sql2 = 'SELECT * FROM brand_pc';

        dataBase.query(sql2, (err, data) => {
            if (err) {
                console.error('Error fetching PC information:', err);
                response.status(500).json({ message: 'Internal Server Error' });
            } else {
                response.render(path.join(__dirname, '../../public/Brand-Pc/Ejs/Admin.Cart.View.ejs'), { brandPcList: data });

            }
        });

    }
};