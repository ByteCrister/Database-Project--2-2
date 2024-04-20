const path = require('path');
const dataBase = require('../../models/DB');
const multer = require('multer');
exports.getAddPc = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname + '/../../views/Add-pc.html'))

    }

};



// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/WD-OLY/OneDrive/Database-Project--2-2/public/Images/PC'); // Set the destination folder 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

// Set up multer 
const upload = multer({ storage: storage });
exports.uploadMultipart = upload.single('productImage');


exports.postAddPC = async (request, response) => {
    if (request.session.isAdminLoggedIn) {
        try {
            
            const {
                brand,
                category,
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

           
            const product_image_path = request.file.filename;

            const sql1 = `
            INSERT INTO pc_information
            (brand, category, model, processor, processor_warranty, motherboard, motherboard_warranty, ram, ram_warranty, storage, storage_warranty, casing, casing_warranty, price, cut_price,  description, product_image_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;


            dataBase.query(sql1, [brand, category, model, processor, processorWarranty, motherboard, motherboardWarranty, ram, ramWarranty, storage, storageWarranty, casing, casingWarranty, price, cut_price, description, product_image_path], (err, data) => {
                if (err) {
                    console.error('Error inserting PC information:', err);
                } else {
                    console.log('PC - ' + data.insertId + ' inserted information successfully.');
                }
            });

            response.redirect('/Pc-Carts');

        } catch (error) {
            console.error('Error adding PC information:', error);
            response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}