const dataBase = require('../../../../models/DB');
const path = require('path');

exports.userViewRouter = (request, response) => {
    if (request.session.isAdminLoggedIn) {

        let sql = `SELECT * FROM users `;

        if (request.params.email != 0) {
            sql += `where email = '${request.params.email}' ;`
        }


        dataBase.query(sql, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                response.render(path.join(__dirname, "../../../../public/Home.Admin/Users.view/user.ejs"), { data });
            }
        })


    } else {
        response.redirect('/');
    }
};

exports.UserRestrictions = (request, response)=>{
    const id = request.params.id;
    const value = request.params.value;
    const sql = `update users set restricted = ${value} where user_id = ${id}; `;
    dataBase.query(sql, (error, data)=>{
        if(error){
            console.log(error);
        }else{
            console.log(id+"   "+value);
            response.redirect('/Users-view-0');
        }
    })
};


exports.userReview  = (request, response)=>{
    if(request.session.isAdminLoggedIn){

        const sql = `
            select users.first_name as first_name,
            users.last_name as last_name,
            user_reviews.user_id as user_id,
            user_reviews.product_category as product_category,
            user_reviews.product_id as product_id,
            user_reviews.review as review,
            user_reviews.stars as stars,
            user_reviews.review_date as review_date
            from users join
            user_reviews on user_reviews.user_id = users.user_id
            where user_reviews.user_id = ${request.params.id};
        `;

        dataBase.query(sql, (error, data)=>{
            if (error) {
                console.log(error);
            } else {
                response.render(path.join(__dirname, "../../../../public/Home.Admin/Users.view/user.reviews.ejs"), { data });
            }
        });

    }else{
        response.redirect('/');
    }
};


exports.userQuestion = (request, response)=>{
    if(request.session.isAdminLoggedIn){

        const sql = `
            select  
            users.first_name as first_name,
            users.last_name as last_name,
            user_questions.user_id as user_id,
            user_questions.product_category as product_category,
            user_questions.product_id as product_id,
            user_questions.user_question as user_question,
            user_questions.question_date as question_date
            from user_questions 
            join users
            on user_questions.user_id = users.user_id
            where users.user_id = ${request.params.id}
            and user_questions.answers is not null;
        `;

        dataBase.query(sql, (error, data)=>{
            if (error) {
                console.log(error);
            } else {
                response.render(path.join(__dirname, "../../../../public/Home.Admin/Users.view/user.question.ejs"), { data });
            }
        });

    }else{
        response.redirect('/');
    }
};




exports.userPurchases = (request, response)=>{
    if(request.session.isAdminLoggedIn){

        const sql = `
        select  
        users.first_name as first_name,
        users.last_name as last_name,
        sh.product_category as product_category,
        sh.product_id as product_id,
        sh.quantity as quantity,
        sh.purchase_date as purchase_date,
        format(cast(replace(sh.product_amount, ',', '') as unsigned)*sh.quantity, 0) as amount
        
        from selling_history as sh
        join users
        on sh.user_id = users.user_id
        where users.user_id = ${request.params.id};
        `;

        dataBase.query(sql, (error, data)=>{
            if (error) {
                console.log(error);
            } else {
                response.render(path.join(__dirname, "../../../../public/Home.Admin/Users.view/user.purchases.ejs"), { data });
            }
        });

    }else{
        response.redirect('/');
    }
};