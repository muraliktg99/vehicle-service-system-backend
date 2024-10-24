import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
function NavBar() {
  return (
    <>
      <div id="sidebar">
      <h1>Vehicle service</h1>
        <nav>
          <ul>
            <li><Link to="/vehicles">Vehicle</Link></li>
            <li><Link to="/components">Components</Link></li>
            <li><Link to="/add-issue">Add Issue</Link></li>
            <li><Link to="/revenue">View Revenue</Link></li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>

  );
}

export default NavBar;