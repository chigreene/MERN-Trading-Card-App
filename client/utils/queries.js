import { gql } from '@apollo/client';

export const Query_ME=gql`
query Query {
  me {
    _id
    email
    username
    savedCards {
      _id
      name
      rarity
      description
    }
  }
}
`

