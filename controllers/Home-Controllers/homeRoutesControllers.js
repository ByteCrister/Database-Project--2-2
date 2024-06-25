const path = require('path');
const dataBase = require('../../models/DB');

exports.getHome = async (request, response) => {
    try {
        const brandPcList = await new Promise((resolve, reject) => {
            dataBase.query(`
                SELECT 
                    brand_pc_No, 
                    brand, 
                    model, 
                    processor, 
                    motherboard, 
                    graphics_card, 
                    _storage_,
                    product_image_path, 
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED), 0) AS cut_price, 
                    FORMAT(CAST(REPLACE(final_price, ',', '') AS UNSIGNED), 0) AS final_price,
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED) - CAST(REPLACE(final_price, ',', '') AS UNSIGNED), 0) AS saveText
                FROM 
                    brand_pc
                    where Hide = 0;
            `, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        const graphicsCardList = await new Promise((resolve, reject) => {
            dataBase.query(`
                SELECT 
                    gp_card_No, 
                    brand, 
                    model, 
                    type, 
                    size, 
                    resolution, 
                    display_port,
                    product_image_path, 
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED), 0) AS cut_price, 
                    FORMAT(CAST(REPLACE(final_price, ',', '') AS UNSIGNED), 0) AS final_price,
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED) - CAST(REPLACE(final_price, ',', '') AS UNSIGNED), 0) AS saveText
                FROM 
                    graphics_card
                    where Hide = 0;
            `, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        const ramList = await new Promise((resolve, reject) => {
            dataBase.query(`
                SELECT 
                    ram_id, 
                    brand, 
                    model, 
                    type, 
                    capacity, 
                    frequency, 
                    operatingVoltage,
                    product_image_path, 
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED), 0) AS cut_price, 
                    FORMAT(CAST(REPLACE(price, ',', '') AS UNSIGNED), 0) AS final_price,
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED) - CAST(REPLACE(price, ',', '') AS UNSIGNED), 0) AS saveText
                FROM 
                    ram_informations
                    where Hide = 0;
            `, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        const pcList = await new Promise((resolve, reject) => {
            dataBase.query(`
                SELECT 
                    pc_information_No, 
                    brand, 
                    model, 
                    processor, 
                    motherboard, 
                    ram, 
                    storage,
                    product_image_path, 
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED), 0) AS cut_price, 
                    FORMAT(CAST(REPLACE(price, ',', '') AS UNSIGNED), 0) AS final_price,
                    FORMAT(CAST(REPLACE(cut_price, ',', '') AS UNSIGNED) - CAST(REPLACE(price, ',', '') AS UNSIGNED), 0) AS saveText
                FROM 
                    pc_information
                    where Hide = 0;
            `, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        const Sliders = await new Promise((resolve, reject) => {
            dataBase.query(
                `select * from ads where Hide = 0`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        const MovingText = await new Promise((resolve, reject) => {
            dataBase.query(
                `select TextValue from movingtext where ID = 1`, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    





        if (request.session.isLoggedIn) {
            response.render(path.join(__dirname, '..', '..', 'public', 'Home.User', 'homeAfterSignIn.ejs'), { brandPcList, graphicsCardList, ramList, pcList, Sliders, MovingText });
        } else if (request.session.isAdminLoggedIn) {
            response.render(path.join(__dirname, '..', '..', 'public', 'Home.Admin', 'Home', 'adminHome.ejs'));

        } else {
            response.render(path.join(__dirname, '..', '..', 'public', 'Home.User', 'homeBeforeSignIn.ejs'), { brandPcList, graphicsCardList, ramList, pcList, Sliders, MovingText });
        }
    } catch (error) {
        console.log(error);
        // Handle error appropriately
    }
};






exports.getAdminData = (req, res) => {
    if (req.session.isAdminLoggedIn) {
        // Query to fetch data
        dataBase.query('SELECT * FROM count_messages WHERE ID = 1', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (!data || !data.length) {
                console.error('No data found');
                res.status(404).json({ error: 'Data not found' });
                return;
            }

            const { questions, reviews, purchases, messages } = data[0];

            // Query to update data
            dataBase.query('UPDATE count_messages SET questions = 0, reviews = 0, purchases = 0, messages = 0 WHERE ID = 1', (error, value) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                // Sending response with the updated data
                res.json({ questions, reviews, purchases, messages });
            });
        });
    } else {
        res.redirect('/');
    }
};
