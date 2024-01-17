const { Schema, Type } = require("mongoose");

const transactionSchema = new Schema({
    transactionId: {
        type:Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    gain: {
        type: Boolean,
        required: true
    },
    body: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
   
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
);

module.exports = transactionSchema;