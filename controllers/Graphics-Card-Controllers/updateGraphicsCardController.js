const dataBase = require('../../models/DB');
const path = require('path');
const fs = require('fs');


exports.updateGraphicsCardControllerGet = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        const pcID = request.params.gp_card_No;
        console.log(pcID);

        const q = `SELECT * FROM graphics_card WHERE gp_card_No = ?`;

        dataBase.query(
            q,
            [pcID],
            (err, data) => {
                if (err) {
                    console.error('Error retrieving graphics card data:', err);
                    response.status(500).send('Internal server error');
                } else {
                    console.log('Graphics card data retrieved successfully:', data);
                    response.render(path.join(__dirname, '../../public', 'update-graphics-card-information'), { data });
                }
            }
        );
    } else {
        response.redirect('/')
    }
};



exports.updateGraphicsCardControllerPost = (request, response) => {
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
        dimension,
        others,
        warranty,
        cut_price,
        final_price,
        description,
        pcID
    } = request.body;

    const product_image_path = request.file.path;
    // Read image file as base64
    const imageBuffer = fs.readFileSync(product_image_path, { encoding: 'base64' });


    const sql = `
    UPDATE graphics_card
    SET 
        brand = ?,
        model = ?,
        type = ?,
        size = ?,
        resolution = ?,
        boost_clock = ?,
        game_clock = ?,
        memory_clock = ?,
        bus_type = ?,
        memory_interface = ?,
        stream_processors = ?,
        display_port = ?,
        hdmi = ?,
        connectors = ?,
        recommended_psu = ?,
        consumption = ?,
        multi_display = ?,
        directX = ?,
        dimensions = ?,
        others = ?,
        warranty = ?,
        cut_price = ?,
        final_price = ?,
        description = ?,
        product_image_path = ?
    WHERE 
        gp_card_No = ?;
`;
    

    // Update the database with the new image path
    dataBase.query(
        sql,
        [brand, model, type, size, resolution, boost_clock, game_clock, memory_clock, bus_type, memory_interface, stream_processors, display_port, hdmi, connectors, recommended_psu, consumption, multi_display, directX, dimension, others, warranty, cut_price, final_price, description, imageBuffer, pcID],
        (err, data) => {
            if (err) {
                response.status(500).send("Internal server error from /update-graphics-card post data" + err);
            } else {
                console.log("Graphics Card deleted successfully");

                response.redirect('/Graphics-Card-Carts');
            }
        }
    );

};