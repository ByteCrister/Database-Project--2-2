const database = require('../../models/DB');
const fs = require('fs');
const path = require('path');

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


        const getDeleteImagePathQuery = `SELECT product_image_path FROM pc_information WHERE pc_information_No = ?`;
        database.query(
            getDeleteImagePathQuery,
            [pcID],
            (err, result) => {
                if (err) {
                    response.status(500).send("Error retrieving image path for deletion");
                } else {
                    const imagePathToDelete = result[0].product_image_path;

                    const deleteQuery = `DELETE FROM pc_information WHERE pc_information_No=?`;
                    database.query(
                        deleteQuery,
                        [pcID],
                        (err, data) => {
                            if (err) {
                                response.status(500).send("Internal server error /deletePcRouter get data");
                            } else {
                                // Delete the image file from the folder
                                fs.unlink(path.join('C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/PC', imagePathToDelete), (err) => {
                                    if (err) {
                                        console.error("Error deleting image file:", err);
                                    } else {
                                        console.log("Image file deleted successfully");
                                    }
                                });

                                response.redirect('/Pc-Carts');
                            }
                        }
                    );
                }
            }
        );
    }
}
