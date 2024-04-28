const path = require('path');
const dataBase = require('../../models/DB');
const fs = require('fs');

exports.getAddRam = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname, '../../views/Add-ram.html'));
    }else{
        response.redirect('/')
    }
};




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

            
            const product_image_path = request.file.path;
            // Read image file as base64
            const imageBuffer = fs.readFileSync(product_image_path, { encoding: 'base64' });

            const sql = `
                INSERT INTO ram_informations
                (brand, model, type, capacity, frequency, operatingVoltage, latency, pin, dimension, warranty, cut_price, price, description, product_image_path)
                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            dataBase.query(sql, [brand, model, type, capacity, frequency, operatingVoltage, latency, pin, dimension, warranty, cut_price, price, description, imageBuffer], (err, data) => {
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