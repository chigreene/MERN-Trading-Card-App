const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/TradingCards')
module.exports=mongoose.connection