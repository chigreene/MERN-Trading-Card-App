const { User, Card } = require("../models/index");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate("savedCards");
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate("savedCards");
    },
    cards: async () => {
      return await Card.find({});
    },
    card: async (parent, { card_id }) => {
      return await Card.findOne({ card_id: card_id });
    },
    // this query is going to be used to get the 3 random cards for opening a pack.
    cardPack: async () => {
      const cards = await Card.aggregate([{ $sample: { size: 3 } }]);
      return cards;
    },
    // sets up route to allow user to access there profile with saved cards
    me: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedCards");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log("no user found");
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },
    addCardToUser: async (parent, { username, card_id }) => {
      const newCard = await Card.findOne({ card_id: card_id });
      return await User.findOneAndUpdate(
        { username },
        { $addToSet: { savedCards: newCard._id } },
        { new: true }
      ).populate("savedCards");
    },
    removeCardFromUser: async (parent, { username, card_id }) => {
      const savedCard = await Card.findOne({ card_id: card_id });
      return await User.findOneAndUpdate(
        { username },
        { $pull: { savedCards: savedCard._id } }
      ).populate("savedCards");
    },

    removeUser: async (parent, { username }) => {
      return await User.findOneAndDelete({ username });
    },
    addCard: async (parent, { card_id, name, rarity, description }) => {
      return await Card.create({
        card_id,
        name,
        rarity,
        description,
      });
    },
    removeCard: async (parent, { card_id }) => {
      return await Card.findOneAndDelete({ card_id });
    },
  },
};

module.exports = resolvers;
