const mongoose =require('mongoose');


const leadsSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim: true
    },
    email:{
        type : String,
        required : true,
        trim: true
    },
    queryType:{
        type : String,
        required : true,
        trim: true
    },
    query:{
        type : String,
        required : true,
        trim: true
    },
    
});


module.exports = mongoose.model('leads',leadsSchema); 