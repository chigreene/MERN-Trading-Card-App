import { gql } from "@apollo/client";

export const Query_ME = gql`
  query Query {
    me {
      _id
      email
      username
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




export const QUERY_PACK = gql`
  query Query {
    cardPack {
      _id
      card_id
      name
      rarity
      description
    }
  }
`;

// export const QUERY_TRADES = gql``;
