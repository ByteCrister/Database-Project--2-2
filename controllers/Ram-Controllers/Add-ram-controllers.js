const path = require('path');
const dataBase = require('../../models/DB');
const multer = require('multer');

exports.getAddRam = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname, '../../views/Add-ram.html'));
    }
};

// Set up multer
const ramStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/Ram'); // Set the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer 
const RamUpload = multer({ storage: ramStorage });
exports.uploadAddRamImage = RamUpload.single('productImage');

/* --------------------------------------------------------------------------------------------------- */




exports.postAddRam = async (request, response) => {
    if (request.session.isAdminLoggedIn) {
        try {
            
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
                description
            } = request.body;

            
            const product_image_path = request.file.filename;

            const sql = `
                INSERT INTO ram_informations
                (brand, model, type, capacity, frequency, operatingVoltage, latency, pin, dimension, warranty, cut_price, price, description, product_image_path)
                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            dataBase.query(sql, [brand, model, type, capacity, frequency, operatingVoltage, latency, pin, dimension, warranty, cut_price, price, description, product_image_path], (err, data) => {
                if (err) {
                    console.error('Error inserting graphics card information:', err);
                } else {
                    console.log('Ram information - ' + data.insertId + ' inserted information successfully.');
                }
            });

            response.redirect('/Ram-Carts');

        } catch (error) {
            console.error('Error adding Ram information:', error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
};