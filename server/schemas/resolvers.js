const {User,Card}=require('../models/index')

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
        card:async(parent,{cardID})=>{
            return await Card.findOne({card_id:cardID})
        },
    },
    Mutation:{
        addCardToUser:async(parent,{userID,cardID})=>{
           return await User.findByIdAndUpdate(
            {_id:userID},
            {$addToSet:{savedCards:cardID}},
            {new:true})
            .populate('savedCards')
        },
        removeCardFromUser:async(parent,{userID,cardID})=>{
            return await User.findByIdAndDelete(
                {_id:userID},
                {$pull:{savedCards:cardID}})
                .populate('savedCards')
        },
         addUser:async (parent,{username,email,password})=>{
            return await User.create({username,email,password})
        },
         removeUser:async(parent,{userID})=>{
            return await User.findByIdAndDelete({_id:userID})
        },
        
    }
}

module.exports=resolvers