const dataBase = require('../../../../models/DB');


exports.QuestionUpdate = (request, response) => {
    const qId = request.body.qId;
    const category = request.body.category;
    const answer = request.body.answer;

    console.log("-> "+qId + " " + category + " "+answer);


    dataBase.query(`update user_questions set answers = '${answer}' where question_no = ${qId};`, (error, data) => {
        if (error) {
            console.log('QuestionUpdate -- Error on data updating');
            console.log("->>"+qId + " " + category);
        } else {
            console.log("->>>"+qId + " " + category);
        }
    });
}