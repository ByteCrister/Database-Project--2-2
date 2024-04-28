const path = require('path');
const dataBase = require('../../models/DB');
const fs = require('fs');

exports.getAddPc = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname + '/../../views/Add-pc.html'))

    }else{
        response.redirect('/')
    }

};


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


            const product_image_path = request.file.path;
            
            // Read image file as base64
            const imageBuffer = fs.readFileSync(product_image_path, { encoding: 'base64' });

            const sql1 = `
            INSERT INTO pc_information
            (brand, category, model, processor, processor_warranty, motherboard, motherboard_warranty, ram, ram_warranty, storage, storage_warranty, casing, casing_warranty, price, cut_price,  description, product_image_path)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;


            dataBase.query(sql1, [brand, category, model, processor, processorWarranty, motherboard, motherboardWarranty, ram, ramWarranty, storage, storageWarranty, casing, casingWarranty, price, cut_price, description, imageBuffer], (err, data) => {
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