const { Schema,model } = require("mongoose");

const tradeSchema = new Schema({
  trader: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  offeredCard:[ {
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: true  
  }],
  requestedCard: [{
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: true 
  }],
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"], // only allow these fields to be added 
    default: "pending" // default value 
  },

});
const Trade=model('Trade',tradeSchema)
module.exports=Trade

//create a method that if the status is reject delete the trade 
