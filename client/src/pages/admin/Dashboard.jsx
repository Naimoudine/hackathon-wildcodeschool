import { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [showNav, setShowNav] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = () => {
    if (showNav) setShowNav(false);
    else setShowNav(true);
  };

  const handleLogOut = () => {
    navigate("/login", { state: "" });
  };
  return (
    <main className={styles.dashboard}>
      <aside>
        <nav>
          <div>
            <NavLink to="/dashboard">Logo</NavLink>
            <ul>
              <li>
                <NavLink to="/dashboard">Events</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">Users</NavLink>
              </li>
            </ul>
          </div>
          <ul>
            {location.state.user ? (
              <button type="button" onClick={handleLogOut}>
                Log out
              </button>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </aside>
      <div>
        <header className={styles.mobilNav}>
          <div>
            <FontAwesomeIcon icon={faBars} onClick={() => handleNav()} />
            <div>
              <span>username</span>
              <img src="" alt="" />
            </div>
          </div>
          <nav
            style={
              showNav
                ? {
                    backgroundColor: "lightgray",
                    width: "100%",
                    transition: "ease-in-out",
                    transitionDelay: "250ms",
                    transform: "translateX(0%)",
                    position: "relative",
                  }
                : {
                    backgroundColor: "lightgray",
                    width: "100%",
                    transform: "translateX(-200%)",
                    position: "absolute",
                  }
            }
          >
            <ul>
              <li>
                <NavLink to="/dashboard">Events</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">Users</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
      </div>
    </main>
  );
}
