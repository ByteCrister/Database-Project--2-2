const dataBase = require('../../models/DB');
const path =  require('path');


const adminHomeViewRouter = require('express').Router();

adminHomeViewRouter.get('/admin-home-view', (request, response)=>{

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
    select format(SUM(REPLACE(product_amount, ',', '')), 0) as total
    from selling_history;
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

    dataBase.query(sql1, (error1, data1)=>{
    dataBase.query(sql2, (error2, data2)=>{
    dataBase.query(sql3, (error3, data3)=>{
    dataBase.query(sql4, (error4, data4)=>{
    dataBase.query(sql5, (error5, data5)=>{
        response.render(path.join(__dirname, '../../public/Admin-Home-View'), { data1, data2, data3, data4, data5 });
    })
    })
    })
    })
    })
});

module.exports = adminHomeViewRouter;