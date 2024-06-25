const dataBase = require('../../../../models/DB');

exports.UpdateText = (request, response) => {
    const { ValueOfText } = request.query;

    try {
        dataBase.query('UPDATE movingtext SET TextValue = ? WHERE ID = 1', [ValueOfText], (err, data) => {
            if (err) {
                console.error('Error updating text:', err);
                response.status(500).send('Failed to update text in database');
            } else {
                console.log('Text updated successfully:', ValueOfText);
                response.redirect('/Advertisements');
            }
        });
    } catch (error) {
        console.error('Error in try-catch block:', error);
        response.status(500).send('Server error');
    }
};
