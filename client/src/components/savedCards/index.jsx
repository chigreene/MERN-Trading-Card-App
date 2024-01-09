import React from 'react';
import { useMutation } from "@apollo/client";
import { DELETE_CARD } from '../../../utils/mutations';
import { Query_ME } from "../../../utils/queries";
import Auth from "../../../utils/auth";

// Image Imports
import Card1 from "../../assets/resources/card1.png"
import tempDelete from "../../assets/tempDeleteIcon.png"
function SavedCards({ savedCards }) {
  if (!savedCards.length) {
    return <h1>No saved Cards Yet</h1>;
  }

  // Getting the username so the mutation can work 
const profile = Auth.getProfile();
const username=profile.data.username

//Delete Card 
const [deleteCard,{error,data}]=useMutation(DELETE_CARD)

const onDeleteClick=async(cardId)=>{
const {data}=await deleteCard({
  variables:{
    username,cardId
  },
  refetchQueries:[{
    query:Query_ME,
  }]
})
}

  return (
    <div className="card-container">
      {savedCards.map((card) => (
    

          <div className="card" style={{ width: "20rem" }} key={card._id}>
            {/* the src bellow is what gives every card that picture */}
            <img className="card-img-top" src={Card1} alt="Card image cap" />
                      <div className="options">
<div id='deleteIcon' onClick={() => onDeleteClick(card.card_id)}>

              <img src={tempDelete} alt="Delete" />
              <p>Delete Card</p>
            </div>

          </div>
            <div className="card-body">
              <h5 className="card-title"># {card.card_id} {card.name} </h5>
              <h6>{card.rarity}</h6>
              <p className="card-text">{card.description}</p>
              <a href="#" className="btn btn-primary">Get More</a>
            </div>
          </div>

      ))}
    </div>
  );
}

export default SavedCards;
