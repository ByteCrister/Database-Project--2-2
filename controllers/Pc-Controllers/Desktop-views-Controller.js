const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopViews = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    if (request.session.isLoggedIn) {
        let sql = '';

        const pcType = request.params.pcType;
        console.log(pcType);

        if(pcType == 'all'){
            sql = `SELECT * FROM pc_information ;`;
            
        }else{
            sql = `SELECT * FROM pc_information WHERE category = "${pcType}";`;

        }


        console.log(sql);
        dataBase.query(
            sql,
            (error, data) => {
                if (error) {
                    console.error('Error fetching PC information:', error);
                    response.status(500).send('Internal Server Error');
                } else {
                    console.log(pcType);
                    response.render(path.join(__dirname, '../public/Desktop-views'), { pcList: data });
                }

            }
        );
    } else {
        response.status(403).send('Unauthorized');
    }

}