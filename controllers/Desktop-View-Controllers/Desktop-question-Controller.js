const dataBase = require('../../models/DB');
const path = require('path');

exports.userQuestion = (request, response)=>{
    if(request.session.isAdminLoggedIn){
        
        // /Desktop/ram-:ramBrand
        let sql = '';
        const date1 = request.query.from;
        const date2 = request.query.to;

        if(date1 == 0){
            sql = `
            select 
            users.first_name as f,
            users.last_name as l,
            users.email as email,
            user_questions.product_category as category,
            user_questions.product_id as pId,
            user_questions.user_question as question,
            user_questions.answers as answer

            from users join user_questions 
            on user_questions.user_id = users.user_id
            where user_questions.answers is not null;
            `;
        }else{
            sql = `
            select 
            users.first_name as f,
            users.last_name as l,
            users.email as email,
            user_questions.product_category as category,
            user_questions.product_id as pId,
            user_questions.user_question as question,
            user_questions.answers as answer

            from users join user_questions 
            on user_questions.user_id = users.user_id
            where user_questions.question_date between '${date1}' and '${date2} and user_questions.answers is not null ';
            `
        }

        dataBase.query(sql, (error, dataList)=>{
            if(error){
                response.status(500).send('error on data fetching')
            }else{
                console.log(date1 + " "+ date2);
                response.render(path.join(__dirname, "/../../public/Admin-users-questions.ejs"), { dataList, date1, date2 })
            }
        });



    }else{
        response.redirect('/');
    }

}