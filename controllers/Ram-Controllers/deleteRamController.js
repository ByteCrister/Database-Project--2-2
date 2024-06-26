const database = require('../../models/DB');
const fs = require('fs');

exports.deleteRamController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.ram_id;


        const QuestionQuery = `DELETE FROM user_questions WHERE product_category = ? AND product_id = ?`;
        const ReviewQuery = `DELETE FROM user_reviews WHERE product_category = ? AND product_id = ?`;
        const PurchaseQuery = `DELETE FROM selling_history WHERE product_category = ? AND product_id = ?`;

        database.query(QuestionQuery, ["Ram", pcID], (err, result1) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Questions are removed for Ram no ' + pcID);
            }
        });

        database.query(ReviewQuery, ["Ram", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Reviews are removed for Ram no ' + pcID);
            }
        });
        database.query(PurchaseQuery, ["Ram", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Purchase are removed for Ram no " + pcID);
            }
        });


        const deleteQuery = `DELETE FROM ram_informations WHERE ram_id=?`;
        database.query(
            deleteQuery,
            [pcID],
            (err, data) => {
                if (err) {
                    response.status(500).send("Internal server error /deletePcRouter get data");
                } else {
                    console.log("Ram removed successfully");

                    response.redirect('/Ram-Carts');
                }
            }
        );
    }
}
