const path = require('path');
const dataBase = require('../../models/DB');
const multer = require('multer');

exports.getAddGraphicsCard = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname, '../../views/Add-graphics-card.html'));
    }
};

// Set up multer storage for brand PC image
const GraphicsCardStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/GraphicsCard'); // Set the destination folder for uploaded brand PC images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer with the configured storage for Graphics Card image
const GraphicsCardUpload = multer({ storage: GraphicsCardStorage });
exports.uploadGraphicsCardImage = GraphicsCardUpload.single('productImage');

/* --------------------------------------------------------------------------------------------------- */




exports.postAddGraphicsCard = async (request, response) => {
    if (request.session.isAdminLoggedIn) {
        try {
            // Extract graphics card information from the request body
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
                dimensions,
                others,
                warranty,
                cut_price,
                final_price,
                description
            } = request.body;

            // Get the path of the uploaded image for the graphics card
            const product_image_path = request.file.filename;

            const sql = `
                INSERT INTO graphics_card
                (brand, model, type, size, resolution, boost_clock, game_clock, memory_clock, bus_type, memory_interface, stream_processors, display_port, hdmi, connectors, recommended_psu, consumption, multi_display, directX, dimensions, others, warranty, cut_price, final_price, description, product_image_path)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            dataBase.query(sql, [brand, model, type, size, resolution, boost_clock, game_clock, memory_clock, bus_type, memory_interface, stream_processors, display_port, hdmi, connectors, recommended_psu, consumption, multi_display, directX, dimensions, others, warranty, cut_price, final_price, description, product_image_path], (err, data) => {
                if (err) {
                    console.error('Error inserting graphics card information:', err);
                } else {
                    console.log('Graphics card - ' + data.insertId + ' inserted information successfully.');
                }
            });

            response.redirect('/Graphics-Card-Carts');

        } catch (error) {
            console.error('Error adding graphics card information:', error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
};