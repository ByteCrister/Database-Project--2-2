const database = require('../../models/DB');
const fs = require('fs');

exports.deleteGraphicsCardController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.gp_card_No;


        const QuestionQuery = `DELETE FROM user_questions WHERE product_category = ? AND product_id = ?`;
        const ReviewQuery = `DELETE FROM user_reviews WHERE product_category = ? AND product_id = ?`;
        const PurchaseQuery = `DELETE FROM selling_history WHERE product_category = ? AND product_id = ?`;


        database.query(QuestionQuery, ["Graphics-Card", pcID], (err, result1) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Questions are removed for Graphics-Card no ' + pcID);
            }
        });

        database.query(ReviewQuery, ["Graphics-Card", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Reviews are removed for Graphics-Card no ' + pcID);
            }
        });
        database.query(PurchaseQuery, ["Graphics-Card", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Purchase are removed for Graphics-Card no " + pcID);
            }
        });

        

        const deleteQuery = `DELETE FROM graphics_card WHERE gp_card_No=?`;
        database.query(
            deleteQuery,
            [pcID],
            (err, data) => {
                if (err) {
                    response.status(500).send("Internal server error /deleteBrandPcRouter get data");
                } else {

                    console.log("Graphics-Card removed successfully");

                    response.redirect('/Graphics-Card-Carts');
                }
            }
        );
    }

}