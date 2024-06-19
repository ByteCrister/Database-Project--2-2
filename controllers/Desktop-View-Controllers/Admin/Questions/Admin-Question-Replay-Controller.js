const path = require('path');
const dataBase = require('../../../../models/DB');


exports.getAdminQuestion = (request, response) => {

    const sql = `
    select user_questions.user_question as question,
    user_questions.question_date as date,
    user_questions.question_no as question_no ,
    user_questions.product_id as pId,
    user_questions.product_category as category,
    users.first_name f_name, users.last_name as l_name, users.email as email
    from user_questions 
    join users on 
    user_questions.user_id = users.user_id
    WHERE user_questions.answers is null;
    `;

    dataBase.query(sql, (error, userQuestions) => {
        if (error) {
            console.log(error);
        } else {

            response.render(
                path.join(__dirname, "../../../../public/Home.Admin/Questions/Admin-Ejs-Question.ejs"), { userQuestions });
        }
    });

}

exports.postAdminQuestion = (request, response)=>{
    const sql = `
        update user_questions 
        set answers = "${request.body.answer}"
        where question_no = ${request.body.question_no};
    `;

    dataBase.query(sql, (error, data)=>{
        if(error){
            console.log(error);
        }else{
            response.redirect('Answer-Questions');
        }
    })
}


exports.getQuestionDrop = (request, response)=>{
    const category = request.params.category;
    const id = request.params.id;

    const sql = `delete from user_questions where product_category = "${category}" and product_id = ${id};`
    dataBase.query(sql, (error, data)=>{
        if(error){
            console.log(error);
        }else{
            console.log(category+"-"+id);
            response.redirect('/Answer-Questions');
        }
    })

};