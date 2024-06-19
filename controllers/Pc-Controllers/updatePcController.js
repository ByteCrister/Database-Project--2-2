const database = require("../../models/DB");
const path = require("path");
const fs = require("fs");

exports.updatePcControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.pc_information_No;
        console.log(pcID);

        const q = `SELECT * FROM pc_information WHERE pc_information_No = ?`;

        database.query(q, [pcID], (err, data) => {
            if (err) {
                response
                    .status(500)
                    .send("Internal server error form UpdatePcRouter get/ data");
            } else {
                response.render(
                    path.join(__dirname, '../../public', 'Pc', 'Ejs', 'update-pc-information.ejs'), { data } );
            }
        });
    } else {
        response.redirect("/");
    }
};



exports.updatePcControllerPost = (request, response) => {
    const {
        brand,
        model,
        category,
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
        pcID,
    } = request.body;

    // Read image file as base64
    const imageBuffer = request.file.buffer.toString("base64");

    const q = `UPDATE pc_information 
    SET brand=?, model=?, category =?, processor=?, processor_warranty=?, motherboard=?, motherboard_warranty=?, ram=?, ram_warranty=?, storage=?, storage_warranty=?, casing=?, casing_warranty=?, price=?, cut_price=?, description=?, product_image_path=?
    WHERE pc_information_No = ?;`;

    database.query(
        q,
        [
            brand,
            model,
            category,
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
            imageBuffer,
            pcID,
        ],
        (err, data) => {
            if (err) {
                response
                    .status(500)
                    .send("Internal server error from /update-pc post data");
            } else {
                response.redirect("/Pc-Carts");
            }
        }
    );
};
