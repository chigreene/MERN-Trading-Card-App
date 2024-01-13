import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CARD } from "../../../utils/mutations";
import { Query_ME } from "../../../utils/queries";
import Auth from "../../../utils/auth";
import "./style.css";
// Image Imports
import Card1 from "../../assets/resources/card1.png";
import tempDelete from "../../assets/tempDeleteIcon.png";
import tempTrade from "../../assets/tempTrade.png";
import CreateTrade from "../createTrade";


function SavedCards({ savedCards, Username }) {
  const [selectCard, setSelect] = useState(null);

  // Getting the username so the mutation can work
  const profile = Auth.getProfile();
  const username = profile.data.username;

  // Delete Card
  const [deleteCard, { error, data }] = useMutation(DELETE_CARD);
  const onDeleteClick = async (cardId) => {
    const { data } = await deleteCard({
      variables: {
        username,
        cardId,
      },
      refetchQueries: [
        {
          query: Query_ME,
        },
      ],
    });
  };

  // Trade Card
  const onTradeClick = (cardID) => {
    setSelect(cardID);
  };
  // Back Button
  const onBackClick=()=>{setSelect(null)}
  if (!savedCards.length) {
    return <h1>No saved Cards Yet</h1>;
  }
   
  return (
    <>
      <div className="card-container">
        {selectCard ? (    
      <>
        <div>
          <button onClick={onBackClick}>Back</button>
       <div className="card-body" style={{ width: "20rem", textAlign:'center'}} key={selectCard._id}>
        <img className="card-img-top" src={Card1} alt="Card image cap" style={{width:'300px'}} />
         <h5 className="card-title">
                  # {selectCard.card_id} {selectCard.name}
          </h5>
          <h6 className={selectCard.rarity}>{selectCard.rarity}</h6>
          <p className="card-text">{selectCard.description}</p>
        </div>
        <CreateTrade recipient={Username} requestedCard={selectCard.card_id}></CreateTrade>
        </div>
        
      </>
    ) : (
          savedCards.map((card) => (
            <div className="card" style={{ width: "20rem" }} key={card._id}>
              {/* the src bellow is what gives every card that picture */}
              <img className="card-img-top" src={Card1} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">
                  # {card.card_id} {card.name}
                </h5>
                <h6 className={card.rarity}>{card.rarity}</h6>
                <p className="card-text">{card.description}</p>
                <div className="options">
                  {username === Username ? (
                    <div
                      className="options"
                      id="delete"
                      onClick={() => onDeleteClick(card.card_id)}
                    >
                      <img src={tempDelete} alt="Delete" />
                      <p>Delete Card</p>
                    </div>
                  ) : (
                    <>
                      <div
                        className="options"
                        id="trade"
                        onClick={() => onTradeClick(card)}
                      >
                        <img src={tempTrade} alt="Trade" />
                        <p>Trade Card</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default SavedCards;

