import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Query_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import SavedCards from "../components/savedCards";
import { QUERY_USER } from "../../utils/queries";
import "./profile.css"

function ProfilePage() {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : Query_ME, {
    variables: { username: userParam },
  });
  
  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  // Check if user object is empty or username is not present
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.username) {
    return (
      <h1>
        Must Be Logged In
      </h1>
    );
  }


  return (
    <>
    <section id="profile">
      <h1>Hello {user.username}</h1>
      {Auth.getProfile().data.username !== userParam ? (
        <SavedCards savedCards={user.savedCards} Username={user.username} />
      ) : (
        <SavedCards savedCards={user.savedCards} Username={userParam} />
      )}
    </section>
    </>
  );
}

export default ProfilePage;
