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

  const [showCompare,setCompare]=useState(false)
  const onCompareClick=()=>{
    setCompare(!showCompare)
  }


  const user = data?.me || data?.user || {};
  //Changing the cards brightness lower
  const compareCards=dataCompare?.compareCards || {}
  const compareCardsIds = Array.isArray(compareCards) ? compareCards.map(card => card.card_id) : [];

const RenderCompare = () => {
  if (showCompare) {
    return (
      <table>
        <thead>
          <tr>
            <th>Card ID</th>
            <th>Rarity</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {compareCards.map((card, index) => (
            <tr key={index}>
              <td>{card.card_id}</td>
              <td className={card.rarity}>{card.rarity}</td>
              <td>{card.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

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
        {!showCompare?(
          <>
        <button onClick={onCompareClick}>Compare Cards With Inventory</button>
        <SavedCards
          savedCards={user.savedCards}
          Username={username}
          compare={compareCardsIds}
        ></SavedCards>
        </>
        ):(
          RenderCompare()
        )}


      </section>
    </div>

  );
}

export default ProfilePage;
