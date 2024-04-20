const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopRamViews = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    if (request.session.isLoggedIn) {

        const RamBrand = request.params.ramBrand;
        let sql = ' ';
        console.log(RamBrand);

        if (RamBrand == 'all') {
            sql = `SELECT * FROM ram_informations ;`;
        } else {
            sql = `SELECT * FROM ram_informations WHERE brand = "${RamBrand}";`;

        }

        dataBase.query(
            sql,
            (error, data) => {
                if (error) {
                    console.error('Error fetching Ram information:', error);
                    response.status(500).send('Internal Server Error');
                } else {
                    response.render(path.join(__dirname, '../../public/Desktop-ram-views'), { RamList: data });
                }

            }
        );
    } else {
        response.status(403).send('Unauthorized');
    }

};