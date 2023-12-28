const {User,Card,Trade}=require('../models/index')

const resolvers={
    
    Query:{
        users:async()=>{
           return await User.find({}).populate('savedCards')
        },
        user:async (parent,{username})=>{
            return await User.findOne({username}).populate('savedCards')
        },
        cards:async()=>{
            return await Card.find({})
        },
        card:async(parent,{card_id})=>{
            return await Card.findOne({card_id:card_id})
        },
        trades: async () => {
    return await Trade.find({})
      .populate('trader')
      .populate('recipient')
      .populate('offeredCard')
      .populate('requestedCard');
  },

    },
    Mutation:{
        addCardToUser:async(parent,{username,card_id})=>{
            const newCard= await Card.findOne({card_id:card_id})
           return await User.findOneAndUpdate(
            {username},
            {$addToSet:{savedCards:newCard._id}},
            {new:true})
            .populate('savedCards')
        },
        removeCardFromUser:async(parent,{username,card_id})=>{
            const savedCard= await Card.findOne({card_id:card_id})
            return await User.findOneAndUpdate(
                {username},
                {$pull:{savedCards:savedCard._id}})
                .populate('savedCards')
        },
         addUser:async (parent,{username,email,password})=>{
            return await User.create({username,email,password})
        },
         removeUser:async(parent,{username})=>{
            return await User.findOneAndDelete({username})
        },
        addCard:async(parent,{card_id,name,rarity,description})=>{
            return await Card.create({
                card_id,
                name,
                rarity,
                description
            })
        },
        removeCard:async(parent,{card_id})=>{
            return await Card.findOneAndDelete({card_id
            })
        },
        createTrade:async(parent,{trader,recipient,offeredCard,requestedCard})=>{
            const Trader=await User.findOne({username:trader})
            const Recipient= await User.findOne({username:recipient})
            const OfferedCard=await Card.findOne({card_id:offeredCard})
            const RequestedCard=await Card.findOne({card_id:requestedCard})
        
            return await Trade.create({ 
            trader:Trader._id,
            recipient:Recipient._id,
            offeredCard:OfferedCard._id,
            requestedCard:RequestedCard._id
             })
        }
        // when creating a trade this fields will be blank except for status thats becasue you can only use 
        //.populate on queries from what i read https://mongoosejs.com/docs/populate.html
        // but if you query for the trade the info will pop up
    }
}

module.exports=resolvers