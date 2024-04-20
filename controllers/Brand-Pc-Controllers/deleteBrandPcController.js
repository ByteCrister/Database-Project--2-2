const database = require('../../models/DB');
const fs = require('fs');
const path = require('path');

exports.deleteBrandPcController = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.brand_pc_No;

        const getDeleteImagePathQuery = `SELECT product_image_path FROM brand_pc WHERE brand_pc_No = ?`;
        database.query(
            getDeleteImagePathQuery,
            [pcID],
            (err, result) => {
                if (err) {
                    response.status(500).send("Error retrieving image path for deletion");
                } else {
                    const imagePathToDelete = result[0].product_image_path;

                    const deleteQuery = `DELETE FROM brand_pc WHERE brand_pc_No=?`;
                    database.query(
                        deleteQuery,
                        [pcID],
                        (err, data) => {
                            if (err) {
                                response.status(500).send("Internal server error /deleteBrandPcRouter get data");
                            } else {
                                // Delete the image file from the folder
                                fs.unlink(path.join('C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/BrandPC', imagePathToDelete), (err) => {
                                    if (err) {
                                        console.error("Error deleting image file:", err);
                                    } else {
                                        console.log("Image file deleted successfully");
                                    }
                                });

                                response.redirect('/Brand-Pc-Carts');
                            }
                        }
                    );
                }
            }
        );
    }
}