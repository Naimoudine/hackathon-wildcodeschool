import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EventModal from "../../components/EventModal";
import styles from "./Dashboard.module.css";
import logo from "../../assets/images/logoWithOutStrok.png";
import UserModal from "../../components/UserModal";

export default function Dashboard() {
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState();
  const [eventAction, setEventAction] = useState(false);
  const [userAction, setUserAction] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = () => {
    if (showNav) setShowNav(false);
    else setShowNav(true);
  };

  const handleLogOut = () => {
    navigate("/login", { state: "" });
    setShowNav(false);
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
      <UserModal
        setShowUserModal={setShowUserModal}
        showUserModal={showUserModal}
        user={user}
        setUserAction={setUserAction}
      />
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
                  Evenements
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/dashboard/users",
                  }}
                  state={{ user }}
                >
                  Utilisateurs
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <button type="button" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </nav>
      </aside>
      <div>
        <header className={styles.mobilNav}>
          <div>
            <img
              src={logo}
              style={{ height: "auto", width: "25px" }}
              alt="logo"
            />
            <FontAwesomeIcon icon={faBars} onClick={() => handleNav()} />
          </div>
          <nav
            style={
              showNav
                ? {
                    backgroundColor: "lightgray",
                    width: "100%",
                    transition: "ease-in-out",
                    transitionDuration: "100ms",
                    transform: "translateX(0%)",
                    position: "relative",
                  }
                : {
                    backgroundColor: "lightgray",
                    width: "100%",
                    transition: "ease-in-out",
                    transform: "translateX(-200%)",
                    position: "absolute",
                  }
            }
          >
            <ul>
              <li>
                <NavLink
                  to="/dashboard"
                  state={{ user }}
                  onClick={() => setShowNav(false)}
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  state={{ user }}
                  onClick={() => setShowNav(false)}
                >
                  Users
                </NavLink>
              </li>
            </ul>
            <button
              type="button"
              style={{
                border: "none",
                width: "100%",
                textAlign: "start",
                backgroundColor: "#5c0099",
                color: "#fff",
                fontSize: "22px",
              }}
              onClick={handleLogOut}
            >
              Log out
            </button>
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
            showUserModal,
            setShowUserModal,
            userAction,
            setUserAction,
          }}
        />
      </div>
    </main>
  );
}
