const deletePcRouter = require('express').Router();

const database = require('../models/DB');
const path = require('path');

deletePcRouter.get('/remove-pc/:pc_information_No', (request, response)=>{
    const pcID = request.params.pc_information_No;

    const q = `DELETE FROM pc_information WHERE pc_information_No=?`;
    database.connect((error)=>{
        if(error){
            response.status(500).send("Internal server error /deletePcRouter get");
        }else{
            database.query(
                q,
                [pcID],
                (err, data)=>{
                    if(err){
                        response.status(500).send("Internal server error /deletePcRouter get data");
                    }else{
                        response.redirect('/Pc-Carts');
                    }
                }
            );
        }
    });
});

module.exports = deletePcRouter;