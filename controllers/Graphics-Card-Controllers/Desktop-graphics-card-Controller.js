const dataBase = require('../../models/DB');
const path = require('path');

exports.getDesktopGraphicsCard = (request, response) => {
    console.log("is logged in -> " + request.session.isLoggedIn);

    if (request.session.isLoggedIn) {

        const GraphicsCardType = request.params.GraphicsCardType;
        let sql = ' ';

        console.log(GraphicsCardType);

        if (GraphicsCardType == 'all') {
            sql = `SELECT * FROM graphics_card ;`;
        } else {
            sql = `SELECT * FROM graphics_card WHERE brand = "${GraphicsCardType}";`;

        }

        dataBase.query(
            sql,
            (error, data) => {
                if (error) {
                    console.error('Error fetching PC information:', error);
                    response.status(500).send('Internal Server Error');
                } else {
                    response.render(path.join(__dirname, '../../public/Desktop-graphics-card-views'), { graphicsCardList: data });
                }

            }
        );
    } else {
        response.redirect('/signIn');
    }

};