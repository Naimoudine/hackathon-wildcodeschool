import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventModal from "../../components/EventModal";
import styles from "./Dashboard.module.css";
import logo from "../../assets/images/logo.png";

export default function Dashboard() {
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [eventAction, setEventAction] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = () => {
    if (showNav) setShowNav(false);
    else setShowNav(true);
  };

  const handleLogOut = () => {
    navigate("/login", { state: "" });
  };

  useEffect(() => {
    setUser(location.state.user);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setEventAction(false);
    }, 1000);
  }, [eventAction]);

  return (
    <main className={styles.dashboard}>
      <EventModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        setEventAction={setEventAction}
      />
      <aside>
        <nav>
          <div>
            <img
              src={logo}
              style={{ height: "auto", width: "50px" }}
              alt="logo"
            />
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: "/dashboard/",
                  }}
                  state={{ user }}
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/dashboard/users",
                  }}
                  state={{ user }}
                >
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
          <ul>
            {user ? (
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
        <Outlet
          context={{
            user,
            setUser,
            showModal,
            setShowModal,
            eventAction,
            setEventAction,
          }}
        />
      </div>
    </main>
  );
}
