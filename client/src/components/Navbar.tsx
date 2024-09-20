import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-title">
        <Link to='/'>
          <p>Cashflow</p>
        </Link>
        <Link to='/expenses'>
          <p>(Expenses)</p>
        </Link>
        <Link to='/investment'>
          <p>Investment</p>
        </Link>
        <Link to='/travel'>
          <p>Travel</p>
        </Link>
        <Link to='/about'>
          <p>About</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
