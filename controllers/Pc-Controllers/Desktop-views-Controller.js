const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopViews = (request, response) => {

    console.log("is logged in -> " + request.session.isLoggedIn);

    let pcType;
    let priceRange;
    let brand;
    let model;
    let highOrLow = request.params.highOrLow;

    let pcType1;
    let brand1 ;
    let model1;

    if(request.params.pcType == '0'){
        pcType1 = '%';
        pcType = '0';
    }else{
        pcType1 = request.params.pcType
        pcType = request.params.pcType
    }

   if(request.params.brand == '0'){
    brand1 = '%';
    brand = '0'
   }else{
    brand1 = request.params.brand;
    brand = request.params.brand;
   }

   if(request.params.model == '0'){
    model1 = '%';
    model = '0';
   }else{
    model1 = request.params.model;
    model = request.params.model;
   }

    // Fetch min and max price
    dataBase.query(`
        SELECT MAX(CAST(REPLACE(price, ',', '') AS UNSIGNED)) AS high,
        MIN(CAST(REPLACE(price, ',', '') AS UNSIGNED)) AS low
        FROM pc_information
        where Hide=0;
    `, (error1, data1) => {
        if (error1) {
            console.error('Error fetching min and max prices:', error1);
            response.status(500).send('Internal Server Error');
            return;
        }

        if(request.params.priceRange == '0'){
            priceRange =  data1[0].high;
        }else{
            priceRange = request.params.priceRange;
        }

        let sql = `
            SELECT * 
            FROM pc_information 
            WHERE category LIKE '${pcType1}%'
            AND CAST(REPLACE(price, ',', '') AS UNSIGNED) <= ${priceRange}
            AND brand LIKE '${brand1}%'
            AND processor LIKE '${model1}%'
            and Hide=0
        `;
        
        if (highOrLow == 'High-to-Low') {
            sql += ' ORDER BY CAST(REPLACE(price, ",", "") AS UNSIGNED) DESC ;';
        } else if (highOrLow == 'Low-to-High') {
            sql += ' ORDER BY CAST(REPLACE(price, ",", "") AS UNSIGNED) ASC ;';
        }

        console.log("Pc category - " + pcType);

        if (request.session.isLoggedIn) {
            console.log(sql);
            // Fetch PC information based on the constructed SQL query
            dataBase.query(sql, (error, data) => {
                if (error) {
                    console.error('Error fetching PC information:', error);
                    response.status(500).send('Internal Server Error');
                    return;
                }
                response.render(path.join(__dirname, '../../public/Pc/Ejs/User.Cart.View.ejs'), { pcList: data, low: data1[0].low, high: data1[0].high, pcType, priceRange, brand, model, highOrLow });
            });
        } else {
            response.redirect('/signIn');
        }
    });

}