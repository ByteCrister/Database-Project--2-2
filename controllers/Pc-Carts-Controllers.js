const path = require('path');
const  dataBase  = require('../models/DB');

exports.getPcCarts = (request, response)=>{
    const sql2 = 'SELECT * FROM pc_information';
        
        dataBase.query(sql2, (err, data) => {
            if (err) {
                console.error('Error fetching PC information:', err);
                response.status(500).json({ message: 'Internal Server Error' });
            } else {
                if(data.length>0){
                    console.log(data[0].product_image_path);
                }
                response.render(path.join(__dirname, '../public/testCart'), { pcList: data });

            }
        })
}