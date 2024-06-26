const dataBase = require('../../../../models/DB');

exports.HidePc = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update pc_information set Hide = 1 where pc_information_No = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('PC hide - '+ID);
        }
    })
 
};
exports.UnhidePc = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update pc_information set Hide = 0 where pc_information_No = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('PC Unhide - '+ID);
        }
    })
};




exports.BrandPcHide = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update brand_pc set Hide = 1 where brand_pc_No = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Brand-PC hide - '+ID);
        }
    })
    
};
exports.UnhideBrandPc = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update brand_pc set Hide = 0 where brand_pc_No = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Brand-PC Unhide - '+ID);
        }
    })
    
};




exports.GraphicsCardHide = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update graphics_card set Hide = 1 where gp_card_No = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Graphics Card hide - '+ID);
        }
    })
    
};
exports.UnhideGraphicsCard = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update graphics_card set Hide = 0 where gp_card_No = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Graphics Card Unhide - '+ID);
        }
    })
    
    
};





exports.RamHide = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update ram_informations set Hide = 1 where ram_id = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Ram hide - '+ID);
        }
    })
    
};
exports.UnhideRam = (request, response)=>{
    const ID = request.params.productID;
    dataBase.query(`update ram_informations set Hide = 0 where ram_id = ${ID}`, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Ram Unhide - '+ID);
        }
    })
    
    
};