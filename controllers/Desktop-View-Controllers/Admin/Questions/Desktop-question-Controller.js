const dataBase = require("../../../../models/DB");
const path = require("path");

/****************** Get all user replayed questions  ********************/
exports.userQuestion = (request, response) => {
    if (request.session.isAdminLoggedIn) {
        // /Desktop/ram-:ramBrand
        let sql = "";
        const date1 = request.query.from;
        const date2 = request.query.to;

        if (date1 == 0) {
            sql = `
            select 
            users.first_name as f,
            users.last_name as l,
            users.email as email,
            user_questions.product_category as category,
            user_questions.question_no as qId,
            user_questions.product_id as pId,
            user_questions.user_question as question,
            user_questions.answers as answer

            from users join user_questions 
            on user_questions.user_id = users.user_id
            where user_questions.answers is not null;
            `;
        } else {
            sql = `
            SELECT 
            users.first_name AS f,
            users.last_name AS l,
            users.email AS email,
            user_questions.question_no as qId,
            user_questions.product_category AS category,
            user_questions.product_id AS pId,
            user_questions.user_question AS question,
            user_questions.answers AS answer
            FROM users 
            JOIN 
            user_questions ON user_questions.user_id = users.user_id
            WHERE 
            user_questions.answers IS NOT NULL 
            AND user_questions.answers != '' 
            AND user_questions.question_date BETWEEN '${date1}' AND '${date2}';
            `;
        }

        dataBase.query(sql, (error, dataList) => {
            if (error) {
                response.status(500).send("error on data fetching");
            } else {
                console.log(date1 + " " + date2);
                response.render(
                    path.join(
                        __dirname,
                        "../../../../public/Home.Admin/Questions/Admin-users-questions.ejs"
                    ),
                    { dataList, date1, date2 }
                );
            }
        });
    } else {
        response.redirect("/");
    }
};
