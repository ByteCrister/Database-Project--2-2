const database = require('../../models/DB');
const fs = require('fs');
const path = require('path');

exports.deleteRamController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.ram_id;

        const getDeleteImagePathQuery = `SELECT product_image_path FROM ram_informations WHERE ram_id = ?`;
        database.query(
            getDeleteImagePathQuery,
            [pcID],
            (err, result) => {
                if (err) {
                    response.status(500).send("Error retrieving image path for deletion");
                } else {
                    const imagePathToDelete = result[0].product_image_path;

                    const deleteQuery = `DELETE FROM ram_informations WHERE ram_id=?`;
                    database.query(
                        deleteQuery,
                        [pcID],
                        (err, data) => {
                            if (err) {
                                response.status(500).send("Internal server error /deletePcRouter get data");
                            } else {
                                // Delete the image file from the folder
                                fs.unlink(path.join('C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/Ram', imagePathToDelete), (err) => {
                                    if (err) {
                                        console.error("Error deleting image file:", err);
                                    } else {
                                        console.log("Image file deleted successfully");
                                    }
                                });

                                response.redirect('/Ram-Carts');
                            }
                        }
                    );
                }
            }
        );
    }
}
