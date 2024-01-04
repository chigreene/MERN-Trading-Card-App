import { Link } from "react-router-dom"
function Nav(){
    return(
        <>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/me'>Profile</Link>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
        </nav>
        </>
    )
}
export default Nav