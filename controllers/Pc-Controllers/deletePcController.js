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


        // Delete the previous image file
    const Sql = `
    SELECT product_image_path FROM pc_information WHERE pc_information_No = ?;
`;
database.query(Sql, [pcID], (err, result) => {
    if (err) {
        console.error("Error retrieving previous image path:", err);
        return response.status(500).send("Internal server error");

    } else {
        const previousImagePath = result[0].product_image_path;
        fs.unlink(previousImagePath, unlinkErr => unlinkErr && console.error("Error deleting previous image file:", unlinkErr));

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
