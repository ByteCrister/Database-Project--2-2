const path = require('path');
const dataBase = require('../../models/DB');
const multer = require('multer');

exports.getAddBrandPC = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname, '../../views/Add-brand-pc.html'));
    }
};

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


exports.postAddBrandPC = async (request, response) => {
    if (request.session.isAdminLoggedIn) {
        try {
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
                description
            } = request.body;

            
            const product_image_path = request.file.filename;

            const sql = `
                INSERT INTO brand_pc
                (brand, model, processor, motherboard, ram, graphics_card, _storage_, power_supply, network_and_wareless_connectivity, operating_system, security_management, keyboard, mouse, optical_drive, extarnal_io_port, dimension, weight, color, warranty, cut_price, final_price, description, product_image_path)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            dataBase.query(sql, [brand, model, processor, motherboard, ram, graphics_card, _storage_, power_supply, network_and_wareless_connectivity, operating_system, security_management, keyboard, mouse, optical_drive, extarnal_io_port, dimension, weight, color, warranty, cut_price, final_price, description, product_image_path], (err, data) => {
                if (err) {
                    console.error('Error inserting brand PC information:', err);
                } else {
                    console.log('Brand PC - ' + data.insertId + ' inserted information successfully.');
                }
            });

            response.redirect('/Brand-PC-Carts');

        } catch (error) {
            console.error('Error adding brand PC information:', error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
