const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const cardSchema=new Schema({
    card_id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    rarity:{
        type:String,
        require:true
    },
    description:{
        type:String
    }
})

const Card=model('Card',cardSchema)
module.exports=Card