const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopRamViews = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    let RamBrand;
    let priceRange;
    let size;
    let model;
    let highOrLow = request.params.highOrLow;

    let RamBrand1;
    let size1;
    let model1;

    if (request.params.ramBrand == '0') {
        RamBrand1 = '%';
        RamBrand = '0';
    } else {
        RamBrand1 = request.params.ramBrand
        RamBrand = request.params.ramBrand
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
   SELECT MAX(CAST(REPLACE(price, ',', '') AS UNSIGNED)) AS high,
   MIN(CAST(REPLACE(price, ',', '') AS UNSIGNED)) AS low
   FROM ram_informations
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
       FROM ram_informations 
       WHERE brand LIKE '${RamBrand1}%'
       AND CAST(REPLACE(price, ',', '') AS UNSIGNED) <= ${priceRange}
       AND capacity LIKE '${size1}%'
       AND model LIKE '${model1}%'
       and Hide=0
   `;

        if (highOrLow == 'High-to-Low') {
            sql += ' ORDER BY CAST(REPLACE(price, ",", "") AS UNSIGNED) DESC ;';
        } else if (highOrLow == 'Low-to-High') {
            sql += ' ORDER BY CAST(REPLACE(price, ",", "") AS UNSIGNED) ASC ;';
        }

        console.log("Ram Type - " + RamBrand);

        if (request.session.isLoggedIn) {

            dataBase.query(
                sql,
                (error, data) => {
                    if (error) {
                        console.error('Error fetching Ram information:', error);
                        response.status(500).send('Internal Server Error');
                    } else {
                        response.render(path.join(__dirname, '../../public/Ram/Ejs/User.Cart.View.ejs'), { RamList: data, low: data1[0].low, high: data1[0].high, RamBrand, priceRange, size, model, highOrLow });
                    }

                }
            );
        } else {
            response.redirect('/signIn');
        }

    })

};