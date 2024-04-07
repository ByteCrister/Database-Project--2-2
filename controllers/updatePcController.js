const database = require('../models/DB');
const path = require('path');
const multer = require('multer');


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



exports.updatePcControllerGet = (request, response)=>{
    const pcID = request.params.pc_information_No;
    console.log(pcID);

    const q = `SELECT * FROM pc_information WHERE pc_information_No = ?`;

    database.connect((error)=>{
        if(error){
            response.status(500).send('Internal server error from UpdatePcRouter get/');
        }else{
            database.query(
                q,
                [pcID],
                (err, data)=>{
                    if(err){
                        response.status(500).send('Internal server error form UpdatePcRouter get/ data');
                    }else{
                        response.render(path.join(__dirname, '../public', 'update-pc-information'), { data });
                    }
                }
            );
        }
    });

};

exports.updatePcControllerPost = (request, response)=>{
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
        description,
        pcID
    } = request.body;

    if (!request.file || !request.file.filename) {
        return response.status(400).send('No file uploaded');
    }
    const product_image_path = request.file.filename;
    console.log(product_image_path);


    const q = `UPDATE pc_information 
    SET brand=?, model=?, processor=?, processor_warranty=?, motherboard=?, motherboard_warranty=?, ram=?, ram_warranty=?, storage=?, storage_warranty=?, casing=?, casing_warranty=?, price=?, cut_price=?, description=?, product_image_path=?
    WHERE pc_information_No = ?`;
    database.connect((error)=>{
        if(error){
            response.status(500).send("Internal server error from /update-pc post");
        }else{
            database.query(
                q,
                [brand, model, processor, processorWarranty, motherboard, motherboardWarranty, ram, ramWarranty, storage, storageWarranty, casing, casingWarranty, price, cut_price, description, product_image_path, pcID],
                (err, data)=>{
                    if(err){
                        response.status(500).send("Internal server error from /update-pc post data");
                    }else{
                        response.redirect('/Pc-Carts');

                    }
                }
            );
        }
    });

}