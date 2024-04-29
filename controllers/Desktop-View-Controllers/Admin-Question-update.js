const dataBase = require('../../models/DB');


exports.adminQuestionUpdate = (request, response) => {
    const pId = request.body.productId;
    const category = request.body.category;
    const answer = request.body.answer;
    const date1 = request.body.date1;
    const date2 = request.body.date2;

    console.log("-> "+pId + " " + category + " "+answer);


    dataBase.query(`update user_questions set answers = '${answer}' where product_category = '${category}' and product_id = ${pId};`, (error, data) => {
        if (error) {
            console.log('Error on data updating');
            console.log("->>"+pId + " " + category);
        } else {
            console.log("->>>"+pId + " " + category);
        }
    });
}