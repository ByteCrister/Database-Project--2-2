const dataBase = require('../../models/DB');
const path = require('path');
const fs = require('fs');


exports.updateRamControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.ram_id;
        console.log(pcID);

        const q = `SELECT * FROM ram_informations WHERE ram_id = ?`;

        dataBase.query(
            q,
            [pcID],
            (err, data) => {
                if (err) {
                    console.error('Error retrieving graphics card data:', err);
                    response.status(500).send('Internal server error');
                } else {
                    console.log('Graphics card data retrieved successfully:', data);
                    response.render(path.join(__dirname, '../../public', 'update-ram-information'), { data });
                }
            }
        );
    } else {
        response.redirect('/');
    }
};





exports.updateRamControllerPost = (request, response) => {
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
        description,
        pcID
    } = request.body;


    const product_image_path = request.file.path;


    // Delete the previous image file
    const Sql = `
     SELECT product_image_path FROM ram_informations WHERE ram_id = ?;
 `;
    dataBase.query(Sql, [pcID], (err, result) => {
        if (err) {
            console.error("Error retrieving previous image path:", err);
            return response.status(500).send("Internal server error");

        } else {
            const previousImagePath = result[0].product_image_path;
            fs.unlink(previousImagePath, unlinkErr => unlinkErr && console.error("Error deleting previous image file:", unlinkErr));

        }

    });




    // Read image file as base64
    const imageBuffer = fs.readFileSync(product_image_path, { encoding: 'base64' });

    if (!product_image_path) {
        return response.status(400).send("No image uploaded");
    }

    const sql = `
    UPDATE ram_informations
    SET 
        brand = ?,
        model = ?,
        type = ?,
        capacity = ?,
        frequency = ?,
        operatingVoltage = ?,
        latency = ?,
        pin = ?,
        dimension = ?,
        warranty = ?,
        cut_price = ?,
        price = ?,
        description = ?,
        product_image_path = ?
    WHERE 
    ram_id = ?;
`;

    // Update the database with the new image path
    dataBase.query(
        sql,
        [brand, model, type, capacity, frequency, operatingVoltage, latency, pin, dimension, warranty, cut_price, price, description, imageBuffer, pcID],
        (err, data) => {
            if (err) {
                response.status(500).send("Internal server error from /update-ram post data" + err);
            } else {
                console.log("Ram updated successfully");

                response.redirect('/Ram-Carts');
            }
        }
    );

};