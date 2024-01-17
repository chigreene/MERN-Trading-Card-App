const { Schema, model } = require("mongoose");
const transactionSchema = require('./transaction.js')

const walletSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        coins: {
            type: Number
        },
        gems: {
            type: Number
        },
        rewardClock: {
            type: Date,
            default: Date.now
        },
        transactions: [transactionSchema]
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
)

const Wallet = model('wallet', walletSchema);

module.exports = Wallet;