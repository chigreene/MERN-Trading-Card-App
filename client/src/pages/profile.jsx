import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Query_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import SavedCards from "../components/savedCards";
import { QUERY_USER,COMPARE_CARDS } from "../../utils/queries";
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
  //Changing the cards brightness lower
  const compareCards=dataCompare?.compareCards || {}
  const compareCardsIds = Array.isArray(compareCards) ? compareCards.map(card => card.card_id) : [];

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.username) {
    return <h1>Must Be Logged In</h1>;
  }
  console.log(user.savedCards)
  console.log(compareCardsIds)
  return (
    <div className="container">
      <section id="profile">
        <h1>Hello {user.username}</h1>
        <SavedCards
          savedCards={user.savedCards}
          Username={username}
          compare={compareCardsIds}
        ></SavedCards>
      </section>
    </div>

  );
}

export default ProfilePage;
