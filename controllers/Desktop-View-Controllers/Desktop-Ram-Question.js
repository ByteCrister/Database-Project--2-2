const path = require('path');
const dataBase = require('../../models/DB');

exports.getRamQuestion = (request, response) => {

    if (request.session.isLoggedIn) {

        const user_id = request.session.userId;
        const ramId = request.query.ram_id;
        const category = request.query.category;

        const sql1 = `
            select brand, model, type, capacity from ram_informations
            where ram_id = ${ramId};
        `;

        const sql2 = `
            select email from users 
            where user_id = ${user_id};
        `;

        dataBase.query(sql1, (err1, data1) => {
            if (err1) {
                response.send(err1);
            } else {

                dataBase.query(sql2, (err2, data2) => {
                    if (err2) {
                        response.send(err2);
                    } else {

                        console.log(user_id + " " + ramId + " " + category);
                        response.render(path.join(__dirname, '/../../public/Desktop-Ram-Question-View.ejs'), {
                            user_id,
                            ramId,
                            category,
                            ramData: data1,
                            user_email: data2
                        });
                    }
                });
            }

        });

        // response.send(ramId+" "+category);

    } else {
        response.redirect('/signIn');
    }
}