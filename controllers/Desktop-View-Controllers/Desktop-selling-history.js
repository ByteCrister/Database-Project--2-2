const dataBase = require('../../models/DB');
const path = require('path');

exports.sellingHistory = (request, response)=>{
    if(request.session.isAdminLoggedIn){

        // /Desktop/ram-:ramBrand
        let sql = '';
        const date1 = request.query.form_date;
        const date2 = request.query.to_date;



        
        if(date1 == 0){
            
            sql = 
            `select
            users.first_name as f,
            users.last_name as l,
            users.email as email,
            selling_history.product_id pid,
            selling_history.product_category pCategory,
            selling_history.purchase_date as pDate,
            selling_history.product_amount as pAmount

            from selling_history
            join users on selling_history.user_id = users.user_id;
            `;
        }else{

            console.log(date1 +" "+date2);
            
            sql = 
            `select
            users.first_name as f,
            users.last_name as l,
            users.email as email,
            selling_history.product_id pid,
            selling_history.product_category pCategory,
            selling_history.purchase_date as pDate,
            selling_history.product_amount as pAmount

            from selling_history
            join users on selling_history.user_id = users.user_id
            where selling_history.purchase_date between '${date1}' and  '${date2}';`;
        }

        dataBase.query(sql, (error, dataList)=>{
            if(error){
                response.status(500).send('error on data fetching')
            }else{
                response.render(path.join(__dirname, "/../../public/Admin-selling-history.ejs"), { dataList, date1, date2 })
            }
        })


    }else{
        response.redirect('/');
    }
}