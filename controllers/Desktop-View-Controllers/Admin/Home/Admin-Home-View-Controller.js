const dataBase = require('../../../../models/DB');
const path =  require('path');


exports.adminHomeViewController = (request, response)=>{

    const sql1 = `
    SELECT  SUM(RowCount) AS TotalProducts
    FROM (
    SELECT COUNT(*) AS RowCount FROM brand_pc
    UNION ALL
    SELECT COUNT(*) AS RowCount FROM pc_information
    UNION ALL
    SELECT COUNT(*) AS RowCount FROM graphics_card
    UNION ALL
    SELECT COUNT(*) AS RowCount FROM ram_informations
    ) AS TotalRows;    
    `

    const sql2 = `
    SELECT FORMAT(SUM(CAST(REPLACE(product_amount, ',', '') AS UNSIGNED)*quantity), 0) AS total
    FROM selling_history;
    `;

    const sql3 = `
    SELECT COUNT(*) as totalUsers
    FROM users;
    `


    const sql4 = `
    SELECT COUNT(*) as totalQuestions FROM user_questions;
    `;

    const sql5 = `
    SELECT COUNT(*) as totalReviews FROM user_reviews;
    `;
    const sql6 = `
    SELECT SUM(quantity) as sold FROM selling_history;
    `

    dataBase.query(sql1, (error1, data1)=>{
    dataBase.query(sql2, (error2, data2)=>{
    dataBase.query(sql3, (error3, data3)=>{
    dataBase.query(sql4, (error4, data4)=>{
    dataBase.query(sql5, (error5, data5)=>{
    dataBase.query(sql6,(error6, data6)=>{

        response.render(path.join(__dirname, '../../../../public/Home.Admin/Home/Admin-Home-View.ejs'), { data1, data2, data3, data4, data5, data6 });
    })
    })
    })
    })
    })
    })
}