const database = require('../../models/DB');
const fs = require('fs');

exports.deletePcController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.pc_information_No;


        const QuestionQuery = `DELETE FROM user_questions WHERE product_category = ? AND product_id = ?`;
        const ReviewQuery = `DELETE FROM user_reviews WHERE product_category = ? AND product_id = ?`;

        database.query(QuestionQuery, ["Pc", pcID], (err, result1) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Questions are removed for Pc no ' + pcID);
            }
        });

        database.query(ReviewQuery, ["Pc", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Reviews are removed for Pc no ' + pcID);
            }
        });



        const deleteQuery = `DELETE FROM pc_information WHERE pc_information_No=?`;
        database.query(
            deleteQuery,
            [pcID],
            (err, data) => {
                if (err) {
                    response.status(500).send("Internal server error /deletePcRouter get data");
                } else {
                    console.log("Pc removed successfully");

                    response.redirect('/Pc-Carts');
                }
            }
        );
    }
}
