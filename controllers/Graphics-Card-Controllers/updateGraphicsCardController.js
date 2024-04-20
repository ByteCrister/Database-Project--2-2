const path = require('path');
const fs = require('fs');
const dataBase = require('../../models/DB');
const multer = require('multer');

// Set up multer storage 
const GraphicsCardStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/GraphicsCard'); // Set the destination folder 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer 
const GraphicsCardUpload = multer({ storage: GraphicsCardStorage });
exports.uploadGraphicsCardImage = GraphicsCardUpload.single('productImage');

/* --------------------------------------------------------------------------------------------------- */




exports.updateGraphicsCardControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.gp_card_No;
        console.log(pcID);

        const q = `SELECT * FROM graphics_card WHERE gp_card_No = ?`;

        dataBase.query(
            q,
            [pcID],
            (err, data) => {
                if (err) {
                    console.error('Error retrieving graphics card data:', err);
                    response.status(500).send('Internal server error');
                } else {
                    console.log('Graphics card data retrieved successfully:', data);
                    response.render(path.join(__dirname, '../../public', 'update-graphics-card-information'), { data });
                }
            }
        );
    } else {
        response.status(403).send('Forbidden');
    }
};



exports.updateGraphicsCardControllerPost = (request, response) => {
    const {
        brand,
        model,
        type,
        size,
        resolution,
        boost_clock,
        game_clock,
        memory_clock,
        bus_type,
        memory_interface,
        stream_processors,
        display_port,
        hdmi,
        connectors,
        recommended_psu,
        consumption,
        multi_display,
        directX,
        dimension,
        others,
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
    UPDATE graphics_card
    SET 
        brand = ?,
        model = ?,
        type = ?,
        size = ?,
        resolution = ?,
        boost_clock = ?,
        game_clock = ?,
        memory_clock = ?,
        bus_type = ?,
        memory_interface = ?,
        stream_processors = ?,
        display_port = ?,
        hdmi = ?,
        connectors = ?,
        recommended_psu = ?,
        consumption = ?,
        multi_display = ?,
        directX = ?,
        dimensions = ?,
        others = ?,
        warranty = ?,
        cut_price = ?,
        final_price = ?,
        description = ?,
        product_image_path = ?
    WHERE 
        gp_card_No = ?;
`;
            // Retrieve current image path from the database
            const getCurrentImagePathQuery = `SELECT product_image_path FROM graphics_card WHERE gp_card_No = ?;`;
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
                            [brand, model, type, size, resolution, boost_clock, game_clock, memory_clock, bus_type, memory_interface, stream_processors, display_port, hdmi, connectors, recommended_psu, consumption, multi_display, directX, dimension, others, warranty, cut_price, final_price, description, product_image_path, pcID],
                            (err, data) => {
                                if (err) {
                                    response.status(500).send("Internal server error from /update-graphics-card post data" + err);
                                } else {
                                    // Delete the old image file
                                    fs.unlink(path.join('C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/GraphicsCard', currentImagePath), (err) => {
                                        if (err) {
                                            console.error("Error deleting old image file:", err);
                                        } else {
                                            console.log("Old image file deleted successfully");
                                        }
                                    });

                                    response.redirect('/Graphics-Card-Carts');
                                }
                            }
                        );
                    }
                } 
            );
};