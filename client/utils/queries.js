import { gql } from "@apollo/client";

// export const Query_ME = gql`
//   query Query {
//     me {
//       _id
//       email
//       username
//       savedCards {
//         _id
//         card_id
//         name
//         rarity
//         description
//       }
//     }
//   }
// `;
// the old Query me

// New one with Trades ( a bit longer lol)
export const Query_ME=gql`
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
    trades {
      _id
      trader {
        username
        savedCards {
          card_id
          name
          rarity
          description
        }
      }
      recipient {
        username
        savedCards {
          card_id
          name
          rarity
          description
        }
      }
      offeredCard {
        name
        rarity
      }
      requestedCard {
        name
        rarity
      }
      status
    }
  }
}
`

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
