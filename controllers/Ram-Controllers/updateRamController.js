const dataBase = require('../../models/DB');
const path = require('path');


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
                    response.render(path.join(__dirname, '../../public', 'Ram', 'Ejs', 'update-ram-information.ejs'), { data });
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


    // Read image file as base64
    const imageBuffer = request.file.buffer.toString("base64");


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