const path = require('path');
const fs = require('fs');
const dataBase = require('../../models/DB');
const multer = require('multer');

// Set up multer storage
const RamStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/Ram'); // Set the destination folder 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer 
const RamUpload = multer({ storage: RamStorage });
exports.uploadRamImage = RamUpload.single('productImage');

/* --------------------------------------------------------------------------------------------------- */




exports.updateRamControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.ram_id;
        console.log(pcID);

        const q = `SELECT * FROM ram_informations WHERE ram_id = ?`;

        dataBase.query(
            q,
            [pcID],
            (err, data) => {
                if (err) {
                    console.error('Error retrieving graphics card data:', err);
                    response.status(500).send('Internal server error');
                } else {
                    console.log('Graphics card data retrieved successfully:', data);
                    response.render(path.join(__dirname, '../../public', 'update-ram-information'), { data });
                }
            }
        );
    } else {
        response.status(403).send('Forbidden');
    }
};



exports.updateRamControllerPost = (request, response) => {
    const {
        brand,
        model,
        type,
        capacity,
        frequency,
        operatingVoltage,
        latency,
        pin,
        dimension,
        warranty,
        cut_price,
        price,
        description,
        pcID
    } = request.body;

    if (!request.file || !request.file.filename) {
        return response.status(400).send('No file uploaded');
    }
    const product_image_path = request.file.filename;

    const sql = `
    UPDATE ram_informations
    SET 
        brand = ?,
        model = ?,
        type = ?,
        capacity = ?,
        frequency = ?,
        operatingVoltage = ?,
        latency = ?,
        pin = ?,
        dimension = ?,
        warranty = ?,
        cut_price = ?,
        price = ?,
        description = ?,
        product_image_path = ?
    WHERE 
    ram_id = ?;
`;
            // Retrieve current image path from the database
            const getCurrentImagePathQuery = `SELECT product_image_path FROM ram_informations WHERE ram_id = ?;`;
            dataBase.query(
                getCurrentImagePathQuery,
                [pcID],
                (err, result) => {
                    if (err) {
                        response.status(500).send("Error retrieving current image path");
                    } else {
                        const currentImagePath = result[0].product_image_path;

                        // Update the database with the new image path
                        dataBase.query(
                            sql,
                            [brand, model, type, capacity, frequency, operatingVoltage, latency, pin, dimension, warranty, cut_price, price, description, product_image_path, pcID],
                            (err, data) => {
                                if (err) {
                                    response.status(500).send("Internal server error from /update-ram post data" + err);
                                } else {
                                    // Delete the old image file
                                    fs.unlink(path.join('C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/Ram', currentImagePath), (err) => {
                                        if (err) {
                                            console.error("Error deleting old image file:", err);
                                        } else {
                                            console.log("Old image file deleted successfully");
                                        }
                                    });

                                    response.redirect('/Ram-Carts');
                                }
                            }
                        );
                    }
                } 
            );
};