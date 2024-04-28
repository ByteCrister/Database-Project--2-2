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
                    path.join(__dirname, "../../public", "update-pc-information"),
                    { data }
                );
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

    const productImage = request.file.path;

    // Read image file as base64
    const imageBuffer = fs.readFileSync(productImage, { encoding: "base64" });




    // Delete the previous image file
    const Sql = `
       SELECT product_image_path FROM pc_information WHERE pc_information_No = ?;
   `;
    database.query(Sql, [pcID], (err, result) => {
        if (err) {
            console.error("Error retrieving previous image path:", err);
            return response.status(500).send("Internal server error");

        } else {
            const previousImagePath = result[0].product_image_path;
            fs.unlink(previousImagePath, unlinkErr => unlinkErr && console.error("Error deleting previous image file:", unlinkErr));

        }

    });




    if (!productImage) {
        return response.status(400).send("No image uploaded");
    }

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
