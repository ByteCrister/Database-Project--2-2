const dataBase = require('../../models/DB');

exports.postRamReview = (request, response) => {

    const productID = request.body.productID;
    const category = request.body.category;
    const review = request.body.description;
    const stars = request.body.rating;

    const sql = `
        insert into user_reviews (user_id, product_category, product_id, review, stars, review_date)
        values(?, ?, ?, ?, ?, CURRENT_DATE());
    `;

    dataBase.query(sql, [request.session.userId, category, productID, review, stars], (err, data) => {
        if (err) {
            response.status(500).send('Error data ' + err);
        } else {
            response.redirect(`/Desktop/${category}_id-${productID}`);
        }
    });


}