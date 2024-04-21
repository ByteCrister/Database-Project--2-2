const path = require('path');
const dataBase = require('../../models/DB');

exports.getRamReview = (request, response) => {
    if (request.session.isLoggedIn) {
        // const user_id = request.session.userId;
        const ramId = request.query.ram_id;
        const category = request.query.category;

        const sql = `
            select brand, model, type, capacity from ram_informations
            where ram_id = ${ramId};
        `;

        dataBase.query(sql, (error, data) => {
            if (error) {
                response.status(500).send('Data error ' + error);
            } else {
                console.log(ramId);
                response.render(path.join(__dirname, '/../../public/Desktop-Ram-Review.ejs'), {
                    ramId,
                    category,
                    data
                });
            }
        });


    } else {
        response.redirect('/signIn')
    }
}