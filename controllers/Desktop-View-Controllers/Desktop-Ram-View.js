const path = require("path");
const dataBase = require("../../models/DB");

exports.getRamView = (request, response) => {
    if (request.session.isLoggedIn) {
        const product_id = request.params.product_id;

        const sql1 = `SELECT * FROM ram_informations WHERE ram_id = ${product_id};`;

        const sql2 = `select 
        user_questions.question_date as question_date, 
        user_questions.user_question as question,
        user_questions.answers as answer,
        users.first_name as f_name,
        users.last_name as l_name
        
        from user_questions join users 
        
        on user_questions.user_id =  users.user_id
        where user_questions.product_category = "Ram" and user_questions.product_id = ${product_id};`;

        const sql3 = `
        select 
        user_reviews.stars as star,
        user_reviews.review as review,
        user_reviews.review_date as date,
        users.first_name as f_name,
        users.last_name as l_name
        
        from user_reviews join users
        on user_reviews.user_id = users.user_id 
        
        where user_reviews.product_category = "Ram" and user_reviews.product_id = ${product_id};`;

        dataBase.query(sql1, (err1, data1) => {
            if (err1) {
                response.status(500).send("Query error: " + err1);
                return;
            }

            dataBase.query(sql2, (err2, data2) => {
                if (err2) {
                    response.status(500).send("Query error: " + err2);
                    return;
                }

                dataBase.query(sql3, (err3, data3) => {
                    if (err3) {
                        response.status(500).send("Query error: " + err3);
                        return;
                    }

                    dataBase.query(
                        `select count(answers) as ans from user_questions where answers is not null and product_category ="Ram" and product_id = ${product_id};`,
                        (err4, data4) => {
                            console.log("Data sended Successfully ");

                            response.render(
                                path.join(__dirname, "/../../public/Desktop-Ram-View.ejs"),
                                {
                                    ramData: data1,
                                    questionData: data2,
                                    reviewData: data3,
                                    totalQuestions: data4,
                                }
                            );
                        }
                    );
                });
            });
        });
    } else {
        response.redirect("/signIn");
    }
};
