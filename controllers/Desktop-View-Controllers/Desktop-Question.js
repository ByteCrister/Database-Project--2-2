const path = require('path');
const dataBase = require('../../models/DB');

/********************** sending values to the users Question form **********************/
exports.getQuestion = (request, response) => {

    if (request.session.isLoggedIn) {

        const user_id = request.session.userId;
        const productId = request.query.productId;
        const category = request.query.category;
        const productName = request.query.productName;


        const sql = `
            select email from users 
            where user_id = ${user_id};
        `;

        dataBase.query(sql, (err2, data) => {
            if (err2) {
                response.send(err2);
            } else {

                console.log(user_id + " " + productId + " " + category);
                response.render(path.join(__dirname, '/../../public/Desktop-Question-View.ejs'), {
                    user_id,
                    productId,
                    category,
                    productName,
                    user_email: data
                });
            }
        });


        // response.send(ramId+" "+category);

    } else {
        response.redirect('/signIn');
    }
}