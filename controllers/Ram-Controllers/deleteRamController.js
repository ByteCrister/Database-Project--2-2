const database = require('../../models/DB');
const fs = require('fs');

exports.deleteRamController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.ram_id;


        const QuestionQuery = `DELETE FROM user_questions WHERE product_category = ? AND product_id = ?`;
        const ReviewQuery = `DELETE FROM user_reviews WHERE product_category = ? AND product_id = ?`;

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


        // Delete the previous image file
        const Sql = `
    SELECT product_image_path FROM ram_informations WHERE ram_id = ?;
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
