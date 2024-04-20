const path = require('path');
const dataBase = require('../../models/DB');
const fs = require('fs');
const multer = require('multer');

// Set up multer storage 
const brandPCStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/BrandPC'); // Set the destination folder 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer 
const brandPCUpload = multer({ storage: brandPCStorage });
exports.uploadBrandPCImage = brandPCUpload.single('productImage');

exports.updateBrandPcControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.brand_pc_No;
        console.log(pcID);

        const q = `SELECT * FROM brand_pc WHERE brand_pc_No = ?`;

        dataBase.connect((error) => {
            if (error) {
                response.status(500).send('Internal server error from UpdateBrandPcRouter get/');
            } else {
                dataBase.query(
                    q,
                    [pcID],
                    (err, data) => {
                        if (err) {
                            response.status(500).send('Internal server error form UpdateBrandPcRouter get/ data');
                        } else {
                            response.render(path.join(__dirname, '../../public', 'update-brand-pc-information'), { data });
                        }
                    }
                );
            }
        });

    }

};

exports.updateBrandPcControllerPost = (request, response) => {
    const {
        brand,
        model,
        processor,
        motherboard,
        ram,
        graphics_card,
        _storage_,
        power_supply,
        network_and_wareless_connectivity,
        operating_system,
        security_management,
        keyboard,
        mouse,
        optical_drive,
        extarnal_io_port,
        dimension,
        weight,
        color,
        warranty,
        cut_price,
        final_price,
        description,
        pcID
    } = request.body;

    if (!request.file || !request.file.filename) {
        return response.status(400).send('No file uploaded');
    }
    const product_image_path = request.file.filename;

    const sql = `
    UPDATE brand_pc
    SET 
        brand = ?,
        model = ?,
        processor = ?,
        motherboard = ?,
        ram = ?,
        graphics_card = ?,
        _storage_ = ?,
        power_supply = ?,
        network_and_wareless_connectivity = ?,
        operating_system = ?,
        security_management = ?,
        keyboard = ?,
        mouse = ?,
        optical_drive = ?,
        extarnal_io_port = ?,
        dimension = ?,
        weight = ?,
        color = ?,
        warranty = ?,
        cut_price = ?,
        final_price = ?,
        description = ?,
        product_image_path = ?
    WHERE 
        brand_pc_No = ?;
`;


    dataBase.connect((error) => {
        if (error) {
            response.status(500).send("Internal server error from /update-pc post");
        } else {
            // Retrieve current image path from the database
            const getCurrentImagePathQuery = `SELECT product_image_path FROM brand_pc WHERE brand_pc_No = ?;`;
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
                            [brand, model, processor, motherboard, ram, graphics_card, _storage_, power_supply, network_and_wareless_connectivity, operating_system, security_management, keyboard, mouse, optical_drive, extarnal_io_port, dimension, weight, color, warranty, cut_price, final_price, description, product_image_path, pcID],
                            (err, data) => {
                                if (err) {
                                    response.status(500).send("Internal server error from /update-brand-pc post data" + err);
                                } else {
                                    // Delete the old image file
                                    fs.unlink(path.join('C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/BrandPC', currentImagePath), (err) => {
                                        if (err) {
                                            console.error("Error deleting old image file:", err);
                                        } else {
                                            console.log("Old image file deleted successfully");
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
    });
};