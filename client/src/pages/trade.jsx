import './trade.css';
import Trades from '../components/trades';
import Auth from '../../utils/auth';
function TradePage() {
  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <h1>Trade Page</h1>
         <Trades></Trades>
        </>
      ) : (
        <h1>Must Be Logged In</h1>
      )}
    </>
  );
}

export default TradePage;
