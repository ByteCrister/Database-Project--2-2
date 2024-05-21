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
                    brand_pc;
            `, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        if (request.session.isLoggedIn) {
            response.render(path.join(__dirname, '..', '..', 'public', 'Home.User', 'homeAfterSignIn.ejs'), { brandPcList });
        } else if (request.session.isAdminLoggedIn) {
            response.render(path.join(__dirname, '..', '..', 'public', 'Home.Admin', 'Home', 'adminHome.ejs'));
        } else {
            response.render(path.join(__dirname, '..', '..', 'public', 'Home.User', 'homeBeforeSignIn.ejs'), { brandPcList });
        }
    } catch (error) {
        console.log(error);
        // Handle error appropriately
    }
};
