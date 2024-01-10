import './trade.css';
import Trades from '../components/trades';
import Auth from "../../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
function TradePage() {
const profile = Auth.getProfile();
const username = profile.data?.username || []; 

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username:username },
  });
    if (loading) {
    return <div>Loading...</div>;
  }

const userTrades = data.user?.trades || [];

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <h1>Trade Page</h1>
         <Trades trades={userTrades}></Trades>
        </>
      ) : (
        <h1>Must Be Logged In</h1>
      )}
    </>
  );
}

export default TradePage;
