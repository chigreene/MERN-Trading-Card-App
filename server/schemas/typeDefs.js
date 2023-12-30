const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedCards: [Card]
  }

  type Auth {
    token: ID!
    user: User
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
    card(card_id: ID!): Card
    cardPack: [Card]
    me: User
  }

  type Mutation{
    addUser(username:String!,email:String!,password:String!):Auth
    login(email: String!, password: String!): Auth
    removeUser(username:String!):User 
    addCardToUser(username:String!,card_id:ID!):User
    removeCardFromUser(username:String!,card_id:ID!):User
    addCard(card_id:ID!,name:String!,rarity:String!,description:String!):Card
    removeCard(card_id:ID!):Card 
  }
`;

module.exports = typeDefs;
