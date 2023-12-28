
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

  type Trade {
    trader: User
    recipient: User
    offeredCard: Card
    requestedCard: Card
    status: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    cards: [Card]
    card(card_id: ID!): Card
    trades: [Trade]
  }

  type Mutation {
    addCardToUser(username: String!, card_id: ID!): User
    removeCardFromUser(username: String!, card_id: ID!): User
    addUser(username: String!, email: String!, password: String!): User
    removeUser(username: String!): User
    addCard(card_id: ID!, name: String!, rarity: String!, description: String!): Card
    removeCard(card_id: ID!): Card
    createTrade(
      trader: String!
      recipient: String!
      offeredCard: String!
      requestedCard: String!
    ): Trade
  }
`;

module.exports = typeDefs;
