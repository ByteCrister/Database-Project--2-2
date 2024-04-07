const path = require('path');
const  dataBase  = require('../models/DB');
const multer = require('multer');
exports.getAddPc = (request, response) => {

    response.sendFile(path.join(__dirname + '/../views/Add-pc.html'))
};



// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/PC'); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer with the configured storage
const upload = multer({ storage: storage });
exports.uploadMultipart = upload.single('productImage');


// Define the route handler for handling the PC information and image upload
exports.postAddPC = async (request, response) => {
    try {
        // Extract PC information from the request body
        const {
            brand,
            model,
            processor,
            processorWarranty,
            motherboard,
            motherboardWarranty,
            ram,
            ramWarranty,
            storage,
            storageWarranty,
            casing,
            casingWarranty,
            price,
            cut_price,
            description
        } = request.body;

        // Get the path of the uploaded image
        const imagePath = request.file.filename;

        // Insert PC information into the database
        const pcInfo = {
            brand,
            model,
            processor,
            processorWarranty,
            motherboard,
            motherboardWarranty,
            ram,
            ramWarranty,
            storage,
            storageWarranty,
            casing,
            casingWarranty,
            price,
            cut_price,
            description,
            product_image_path: imagePath // Save the image path in the database
        };

        const sql1 = `
        INSERT INTO pc_information
        (brand, model, processor, processor_warranty, motherboard, motherboard_warranty, ram, ram_warranty, storage, storage_warranty, casing, casing_warranty, price, cut_price,  description, product_image_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


        dataBase.query(sql1, [brand, model, processor, processorWarranty, motherboard, motherboardWarranty, ram, ramWarranty, storage, storageWarranty, casing, casingWarranty, price, cut_price, description, imagePath], (err, data) => {
            if (err) {
                console.error('Error inserting PC information:', err);
            } else {
                console.log('PC - '+data.insertId+' inserted information successfully.');
            }
        });
        
       response.redirect('/Pc-Carts');

    } catch (error) {
        console.error('Error adding PC information:', error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
}