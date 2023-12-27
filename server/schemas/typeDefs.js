const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedCards: [Card]
  }

  type Card {
    _id: ID
    card_id: ID
    name: String
    rarity: String
    description: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    cards: [Card]
    card(cardID: ID!): Card
  }

  type Mutation{
    addCardToUser(userID:ID!,cardID:ID!):User
    removeCardFromUser(userID:ID!,cardID:ID!):User
    addUser(username:String!,email:String!,password:String!):User
    removeUser(userID:ID!):User 
  }
`;


module.exports=typeDefs