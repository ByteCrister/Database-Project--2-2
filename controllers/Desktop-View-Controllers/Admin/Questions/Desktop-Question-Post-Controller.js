const dataBase = require('../../../../models/DB');

/****************** Fetching data from users question form and send it to the database ****************/
exports.DesktopQuestionPostController = (request, response) => {

    const category = request.body.category;
    const productID = request.body.productID;
    const description = request.body.description;

    const count = `
    UPDATE count_messages
    set questions = 1+ (SELECT questions from count_messages where ID = 1)
    where ID = 1;`
   dataBase.query(count, (error, data)=>{});

    console.log(description);

    const sql = `
        insert into user_questions (user_id, product_category, product_id, user_question, question_time, question_date)
        values(?, ?, ?, ?, CURRENT_TIME(), CURRENT_DATE());
    `;

    dataBase.query(sql, [request.session.userId, category, productID, description], (err, data) => {

        if (err) {
            response.status(500).send('Data error -> ' + err);
            console.log(err);
        } else {
            console.log('Data sended Successfully : ' + `/Desktop/${category}_id-${productID}`);
            response.redirect(`/Desktop/${category}_id-${productID}`);
        }
    });

}