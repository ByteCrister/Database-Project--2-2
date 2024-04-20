const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopBrandPc = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    if (request.session.isLoggedIn) {

        let sql = '';

        const pcType = request.params.pcType;
        console.log(pcType);

        if (pcType == 'all') {
            sql = `SELECT * FROM brand_pc ;`;
            
        } else {
            sql = `SELECT * FROM brand_pc WHERE brand = "${pcType}";`;

        }

        dataBase.query(
            sql,
            (error, data) => {
                if (error) {
                    console.error('Error fetching PC information:', error);
                    response.status(500).send('Internal Server Error');
                } else {
                    response.render(path.join(__dirname, '../../public/Desktop-brand-pc-views'), { brandPcList: data });
                }

            }
        );
    } else {
        response.status(403).send('Unauthorized');
    }

};