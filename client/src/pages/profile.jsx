import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Query_ME } from '../../utils/queries';
import Auth from '../../utils/auth'

function ProfilePage() {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(Query_ME, {
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
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


 
  return (
    <>
      <section id="profile">
        <h1>
          Hello {user.username}
        </h1>

      </section>
    </>
  );
}

export default ProfilePage;



