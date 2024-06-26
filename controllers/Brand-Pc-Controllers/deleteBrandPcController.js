const database = require("../../models/DB");
const fs = require("fs");

exports.deleteBrandPcController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.brand_pc_No;

        const QuestionQuery = `DELETE FROM user_questions WHERE product_category = ? AND product_id = ?`;
        const ReviewQuery = `DELETE FROM user_reviews WHERE product_category = ? AND product_id = ?`;
        const PurchaseQuery = `DELETE FROM selling_history WHERE product_category = ? AND product_id = ?`;

        database.query(QuestionQuery, ["Brand-Pc", pcID], (err, result1) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Questions are removed for Brand PC no " + pcID);
            }
        });

        database.query(ReviewQuery, ["Brand-Pc", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Reviews are removed for Brand PC no " + pcID);
            }
        });
        database.query(PurchaseQuery, ["Brand-Pc", pcID], (err, result2) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Purchase are removed for Brand PC no " + pcID);
            }
        });


        const deleteQuery = `DELETE FROM brand_pc WHERE brand_pc_No=?`;
        database.query(deleteQuery, [pcID], (err, data) => {
            if (err) {
                response
                    .status(500)
                    .send("Internal server error /deleteBrandPcRouter get data");
            } else {
                console.log("Brand Pc removed successfully");
                response.redirect("/Brand-Pc-Carts");
            }
        });
    }
};
