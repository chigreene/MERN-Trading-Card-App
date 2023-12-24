
const db=require('../config/connection')
const {User,Card}=require('../models/index')
const cardSeeds=require('./cardSeeds.json')
const userSeeds=require('./userSeeds.json')
const cleanDb=require('./cleanDb')

db.once('open',async()=>{
    try{
         await cleanDb('Cards', 'cards');
         await cleanDb('User', 'users');

        const users = await User.create(userSeeds);
        const cards = await Card.create(cardSeeds);

         if (users.length > 0 && cards.length > 0) {
            // Push the first friend's ObjectId to the friends array of the first user
            // Extract all friend ObjectIds
            const cardsOwned = cards.map(card => card._id);

            // Push all friend ObjectIds to the first user's friends array
            users[0].savedCards.push(...cardsOwned);


            // Save the updated user
            await users[0].save();}
    }
    catch(error){
        console.error(error)
        process.exit(1)
    }
    console.log('Database Seeded')
    process.exit(0)
})