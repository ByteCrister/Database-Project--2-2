const dataBase = require('../../../../models/DB');
const path = require('path');

exports.usersRating = (request, response) => {
    let category = request.query.category;
    let sort = request.query.sort;
    console.log(category + " " + sort);

    if (request.session.isAdminLoggedIn) {

        let sql1 = '';

        if (category == 'All' || category == 0) {
            if (sort == 'all' || sort == 0) {
                sql1 = `
                select count(review) as reviews,
                round(AVG(stars), 2) as rating,
                product_category as category,
                product_id as pId
                FROM user_reviews
                GROUP BY product_category, product_id;`
            } else {
                sql1 = `
                select count(review) as reviews,
                round(AVG(stars), 2) as rating,
                product_category as category,
                product_id as pId
                FROM user_reviews
                GROUP BY product_category, product_id
                order by ${sort};`
            }

        } else {
            if (sort == 'all') {
                sql1 = `
                select count(review) as reviews,
                round(AVG(stars), 2) as rating,
                product_category as category,
                product_id as pId
                FROM user_reviews
                where product_category = "${category}"
                GROUP BY product_category, product_id;`
            } else {
                sql1 = `
                select count(review) as reviews,
                round(AVG(stars), 2) as rating,
                product_category as category,
                product_id as pId
                FROM user_reviews
                where product_category = "${category}"
                GROUP BY product_category, product_id
                order by ${sort};`
            }

        }

        dataBase.query(sql1, (error, ratingList) => {
            if (error) {
                console.log(sql1);
                console.log('Data fetching error');
            } else {

                response.render(path.join(__dirname, "../../../../public/Home.Admin/Rating/Admin-ratings.ejs"), { ratingList })
            }
        });


    } else {
        response.redirect('/');
    }
};


exports.dropUserRating = (request, response)=>{

    const category = request.params.category;
    const id = request.params.id;
    const sortCategory = request.params.sortCategory;
    const sortBy = request.params.sortBy;

    const sql = `delete from user_reviews where product_category = '${category}' and product_id = ${id}`;

    dataBase.query(sql, (error, data)=>{
        if(error){
            console.log(error);
        }else{
            response.redirect(`/User/Ratings?category=${sortCategory}&sort=${sortBy}`);
        }
    });

};