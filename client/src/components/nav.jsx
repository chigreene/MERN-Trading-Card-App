import { Link,useNavigate} from "react-router-dom";
import './nav.css';
import Auth from "../../utils/auth";

function Nav() {
  const navigate=useNavigate()
  // Logout User
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate('/')
  };


  return (
    <nav>
      {Auth.loggedIn() ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/me">Profile</Link>
          <Link to="/userSearch">Search Users</Link>
          <Link to="/trade">Trade</Link>
          <a onClick={logout}>Logout</a>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Nav;
