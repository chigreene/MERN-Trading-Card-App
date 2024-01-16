import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Collection from "../components/collection";
import Auth from "../../utils/auth";
import SavedCards from "../components/savedCards";
import { QUERY_USER,COMPARE_CARDS,Query_ME } from "../../utils/queries";
import { useState } from "react";
import "./profile.css";

function ProfilePage() {
  const profile = Auth.getProfile();
  const username = profile?.data?.username;

  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : Query_ME, {
    variables: { username: userParam },
  });

  const {loading:loadingCompare,data:dataCompare}=useQuery(COMPARE_CARDS,{
    variables:{logged:username,username:userParam}
  })


  const user = data?.me || data?.user || {};
  
  const [showCompare,setCompare]=useState(false)

  const compareCards=dataCompare?.compareCards || {}
  const compareCardsIds = Array.isArray(compareCards) ? compareCards.map(card => card.card_id) : [];



const onCompareClick=()=>{
    setCompare(!showCompare)
  }
  const renderCompare=()=>{
    if(showCompare){
   return <Collection compare={compareCardsIds}></Collection>
    }else{
      return null
    }
  }


  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.username) {
    return <h1>Must Be Logged In</h1>;
  }

return (
  <div className="container">
    <section id="profile">
      <h1>Hello {user.username}</h1>

      {showCompare ? (
        <>
        <button onClick={()=>{setCompare(false)}}>Return</button>
          {renderCompare()}
        </>
      ) : (
        <>
          <button onClick={onCompareClick}>Compare Cards With Inventory</button>
          <SavedCards
            savedCards={user.savedCards}
            Username={username}
            compare={compareCardsIds}
          ></SavedCards>
        </>
      )}
    </section>
  </div>
);



}

export default ProfilePage;
