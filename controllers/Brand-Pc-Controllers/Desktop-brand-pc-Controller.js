const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopBrandPc = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    let pcType;
    let priceRange;
    let size;
    let model;
    let highOrLow = request.params.highOrLow;

    let pcType1;
    let size1;
    let model1;

    if (request.params.pcType == '0') {
        pcType1 = '%';
        pcType = '0';
    } else {
        pcType1 = request.params.pcType
        pcType = request.params.pcType
    }

    if (request.params.size == '0') {
        size1 = '%';
        size = '0'
    } else {
        size1 = request.params.size;
        size = request.params.size;
    }

    if (request.params.model == '0') {
        model1 = '%';
        model = '0';
    } else {
        model1 = request.params.model;
        model = request.params.model;
    }

    // Fetch min and max price
    dataBase.query(`
     SELECT MAX(CAST(REPLACE(final_price, ',', '') AS UNSIGNED)) AS high,
     MIN(CAST(REPLACE(final_price, ',', '') AS UNSIGNED)) AS low
     FROM brand_pc
     where Hide=0;
  `, (error1, data1) => {
        if (error1) {
            console.error('Error fetching min and max prices:', error1);
            response.status(500).send('Internal Server Error');
            return;
        }

        if (request.params.priceRange == '0') {
            priceRange = data1[0].high;
        } else {
            priceRange = request.params.priceRange;
        }

        let sql = `
         SELECT * 
         FROM brand_pc 
         WHERE brand LIKE '${pcType1}%'
         AND CAST(REPLACE(final_price, ',', '') AS UNSIGNED) <= ${priceRange}
         AND ram LIKE '${size1}%'
         AND model LIKE '${model1}%'
         and Hide=0;
     `;

        if (highOrLow == 'High-to-Low') {
            sql += ' ORDER BY CAST(REPLACE(final_price, ",", "") AS UNSIGNED) DESC where Hide=0 ;';
        } else if (highOrLow == 'Low-to-High') {
            sql += ' ORDER BY CAST(REPLACE(final_price, ",", "") AS UNSIGNED) ASC where Hide=0 ;';
        }

        console.log("Brand Pc - " + pcType);


        if (request.session.isLoggedIn) {
            dataBase.query(
                sql,
                (error, data) => {
                    if (error) {
                        console.error('Error fetching PC information:', error);
                        response.status(500).send('Internal Server Error');
                    } else {
                        response.render(path.join(__dirname, '../../public/Brand-Pc/Ejs/User.Cart.View.ejs'), { brandPcList: data, low: data1[0].low, high: data1[0].high, pcType, priceRange, size, model, highOrLow });
                    }

                }
            );
        } else {
            response.redirect('/signIn');
        }

    });



};