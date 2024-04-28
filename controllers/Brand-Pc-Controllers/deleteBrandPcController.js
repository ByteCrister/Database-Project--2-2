const database = require("../../models/DB");
const fs = require("fs");

exports.deleteBrandPcController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.brand_pc_No;

        const QuestionQuery = `DELETE FROM user_questions WHERE product_category = ? AND product_id = ?`;
        const ReviewQuery = `DELETE FROM user_reviews WHERE product_category = ? AND product_id = ?`;

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

        // Delete the previous image file
        const Sql = `
        SELECT product_image_path FROM brand_pc WHERE brand_pc_No = ?;
    `;
        database.query(Sql, [pcID], (err, result) => {
            if (err) {
                console.error("Error retrieving previous image path:", err);
                return response.status(500).send("Internal server error");
            } else {
                const previousImagePath = result[0].product_image_path;
                fs.unlink(
                    previousImagePath,
                    (unlinkErr) =>
                        unlinkErr &&
                        console.error("Error deleting previous image file:", unlinkErr)
                );
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
