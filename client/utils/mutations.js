import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedCards {
          card_id
          name
          rarity
          description
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        username
        email
        savedCards {
          card_id
          name
          rarity
          description
        }
      }
      token
    }
  }
`;

export const ADD_CARD = gql`
  mutation Mutation($username: String!, $cardIds: [ID]!) {
    addCardsToUser(username: $username, card_ids: $cardIds) {
      _id
      username
      email
      password
      savedCards {
        _id
        card_id
        name
        rarity
        description
      }
    }
  }
`;


export const DELETE_CARD=gql`
mutation RemoveCardFromUser($username: String!, $cardId: ID!) {
  removeCardFromUser(username: $username, card_id: $cardId) {
    username
    savedCards {
      _id
      card_id
      name
      rarity
      description
    }
  }
}`