import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-title">
        <Link to='/'>
          <h2>Home Page</h2>
        </Link>
        <Link to='/investment'>
        <h2>Investment</h2>
        </Link>
        <Link to='/travel'>
        <h2>Currency Exchange</h2>
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
