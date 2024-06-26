const dataBase = require('../../models/DB');
const path = require('path');
const fs = require('fs');



exports.updateBrandPcControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.brand_pc_No;
        console.log(pcID);

        const q = `SELECT * FROM brand_pc WHERE brand_pc_No = ?`;

        dataBase.connect((error) => {
            if (error) {
                response.status(500).send('Internal server error from UpdateBrandPcRouter get/');
            } else {
                dataBase.query(
                    q,
                    [pcID],
                    (err, data) => {
                        if (err) {
                            response.status(500).send('Internal server error form UpdateBrandPcRouter get/ data');
                        } else {
                            response.render(path.join(__dirname, '../../public', 'Brand-Pc', 'Ejs', 'update-brand-pc-information.ejs'), { data });
                            
                        }
                    }
                );
            }
        });

    } else {
        response.redirect('/');
    }

};

exports.updateBrandPcControllerPost = (request, response) => {
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
        description,
        pcID
    } = request.body;

    // Read image file as base64
    const imageBuffer = request.file.buffer.toString("base64");
    

    const sql = `
    UPDATE brand_pc
    SET 
        brand = ?,
        model = ?,
        processor = ?,
        motherboard = ?,
        ram = ?,
        graphics_card = ?,
        _storage_ = ?,
        power_supply = ?,
        network_and_wareless_connectivity = ?,
        operating_system = ?,
        security_management = ?,
        keyboard = ?,
        mouse = ?,
        optical_drive = ?,
        extarnal_io_port = ?,
        dimension = ?,
        weight = ?,
        color = ?,
        warranty = ?,
        cut_price = ?,
        final_price = ?,
        description = ?,
        product_image_path = ?
    WHERE 
        brand_pc_No = ?;
`;




    // Update the database with the new image path
    dataBase.query(
        sql,
        [brand, model, processor, motherboard, ram, graphics_card, _storage_, power_supply, network_and_wareless_connectivity, operating_system, security_management, keyboard, mouse, optical_drive, extarnal_io_port, dimension, weight, color, warranty, cut_price, final_price, description, imageBuffer, pcID],
        (err, data) => {
            if (err) {
                response.status(500).send("Internal server error from /update-brand-pc post data" + err);
            } else {
                console.log("Brand Pc updated successfully");

                response.redirect('/Brand-Pc-Carts');
            }
        }
    );

};