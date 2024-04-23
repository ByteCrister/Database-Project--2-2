const path = require('path');
const dataBase = require('../../models/DB');

exports.getReview = (request, response) => {
    if (request.session.isLoggedIn) {
        // const user_id = request.session.userId;
        
        const productName = request.query.productName;
        const productId = request.query.productId;
        const category = request.query.category;


        console.log(productId);
        response.render(path.join(__dirname, '/../../public/Desktop-Review.ejs'), {
            productId,
            category,
            productName
        })


    } else {
        response.redirect('/signIn')
    }
}