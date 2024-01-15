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

const RenderCompare = () => {
  const comparedCards=dataCompare?.compareCards || {}
  if (showCompare) {
    if(!userParam){
    return(
<table>
    <thead>
      <tr>
        <th>Card ID</th>
        <th>Rarity</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {
        comparedCards.map((card)=>(
          <tr>
            <td>{card.card_id}</td>
            <td>{card.rarity}</td>
            <td>{card.name}</td>
          </tr>
        ))
      }
    </tbody>
  </table>
    )
  }else{
     return <SavedCards savedCards={comparedCards}></SavedCards>;
  }
  }

 
  return null; // It's good practice to return null if the condition is not met
};

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  // Check if user object is empty or username is not present
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
        <button onClick={()=>{setCompare(!showCompare)}}>Compare Cards</button>
        <SavedCards
          savedCards={user.savedCards}
          Username={username}
        ></SavedCards>
      </section>
          {RenderCompare()}
    </div>

  );
}

export default ProfilePage;
