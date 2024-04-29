const path = require('path');
const dataBase = require('../../models/DB');
const fs = require('fs');

exports.getAddGraphicsCard = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        response.sendFile(path.join(__dirname, '../../views/Add-graphics-card.html'));
    }
};




exports.postAddGraphicsCard = async (request, response) => {
    if (request.session.isAdminLoggedIn) {
        try {
            
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

            
            const imageBuffer = request.file.buffer.toString("base64");

            const sql = `
                INSERT INTO graphics_card
                (brand, model, type, size, resolution, boost_clock, game_clock, memory_clock, bus_type, memory_interface, stream_processors, display_port, hdmi, connectors, recommended_psu, consumption, multi_display, directX, dimensions, others, warranty, cut_price, final_price, description, product_image_path)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            dataBase.query(sql, [brand, model, type, size, resolution, boost_clock, game_clock, memory_clock, bus_type, memory_interface, stream_processors, display_port, hdmi, connectors, recommended_psu, consumption, multi_display, directX, dimensions, others, warranty, cut_price, final_price, description, imageBuffer], (err, data) => {
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