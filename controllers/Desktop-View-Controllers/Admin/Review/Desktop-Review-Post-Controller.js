const dataBase = require('../../../../models/DB');


/*********************** Fetching values from users review form and send it to the database ****************/
exports.postReview = (request, response) => {

    const productID = request.body.productID;
    const category = request.body.category;
    const review = request.body.description;
    const stars = request.body.rating;
    const count = `
    UPDATE count_messages
    set reviews = 1+ (SELECT reviews from count_messages where ID = 1)
    where ID = 1;`
   dataBase.query(count, (error, data)=>{});

    const sql = `
        insert into user_reviews (user_id, product_category, product_id, review, stars, review_date)
        values(?, ?, ?, ?, ?, CURRENT_DATE());
    `;

    dataBase.query(sql, [request.session.userId, category, productID, review, stars], (err, data) => {
        if (err) {
            response.status(500).send('Error data ' + err);
        } else {
            console.log(productID+" "+category+" "+review+" "+stars);
            response.redirect(`/Desktop/${category}_id-${productID}`);
        }
    });


}