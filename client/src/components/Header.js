import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return <header className="bg-light py-3">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="nav">
            <Link className="nav-link" to="/">Fib Calculator</Link>
            <Link className="nav-link" to="/otherpage">Other Page</Link>
          </nav>
        </div>
      </div>
    </div>
  </header>;
};

export default Header;
