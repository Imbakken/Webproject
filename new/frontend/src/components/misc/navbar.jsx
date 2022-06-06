import { Link } from "react-router-dom";
import logo from "../../assets/illustrations/logo.png";
import ActiveUser from './activeUser';

//Stateless component used to navigate the different pages
//Sending props from app.js to hide or show certain links in the navbar
function Nav(props) {

    return (
        <nav>
            <div className="navContainer">
                <div className="nav">
                    <div className="smallogo">
                        <img alt="Logo" src={logo} />
                    </div>
                    <ul className="navigation-bar">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      {!props.isAuth && <li>
                        <Link to="/info">About the project</Link>
                      </li>}
                      {!props.isAuth && <li>
                        <Link to="/login">Login</Link>
                      </li>}
                      {props.isAdmin && <li>
                        <Link to="/job-overview">Job overview</Link>
                      </li>}
                      {props.isAdmin&& <li>
                        <Link to="/add-job">Add jobs</Link>
                      </li>}
                      {props.isAdmin && <li>
                        <Link to="/adminpage" >Users</Link>
                      </li>}
                      {props.isAuth && <li>
                        <Link to="/login" onClick={props.handleLogOut}>Log out</Link>
                      </li>}
                      {props.isAuth &&
                    <ActiveUser />}
                    </ul>
                    </div>
                    <form class="searchBox">
                      <input type="search" className="searchInput" placeholder="Search..." aria-label="Search"></input>
                    </form>
            </div>
          </nav>
    )
}

export default Nav;