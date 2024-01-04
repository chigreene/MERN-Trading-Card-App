import { gql } from '@apollo/client';

export const SIGN_UP=gql`
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

`

export const LOGIN=gql`
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

`