const dataBase = require('../models/DB');
const path = require('path');

exports.getDesktopViews = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    if (request.session.isLoggedIn) {

        const pcType = request.params.pcType;
        console.log(pcType);
        let sql = '';
        let selectedCategory = '';
        let selectedBrand = '';

        if (pcType == 'special') {
            selectedCategory = 'special';
            selectedBrand = 'special';


        } else if (pcType == 'INTEL') {
            selectedCategory = 'INTEL';
            selectedBrand = 'INTEL';


        } else if (pcType == 'Ryzen') {
            selectedCategory = 'Ryzen';
            selectedBrand = 'Ryzen';


        } else if (pcType == 'gaming') {
            selectedCategory = 'gaming';
            selectedBrand = 'gaming';

        }

        if (selectedCategory == selectedBrand) {
            sql = `SELECT * FROM pc_information WHERE category = "${selectedCategory}";`;
        } else {
            sql = `SELECT * FROM pc_information WHERE category = "${selectedCategory}" AND brand = "${selectedBrand}";`;

        }
        console.log(sql);
        dataBase.query(
            sql,
            (error, data) => {
                if (error) {
                    console.error('Error fetching PC information:', error);
                    response.status(500).send('Internal Server Error');
                } else {
                    console.log(selectedCategory + " " + selectedBrand);
                    response.render(path.join(__dirname, '../public/Desktop-views'), { pcList: data });
                }

            }
        );
    } else {
        response.status(403).send('Unauthorized');
    }

}