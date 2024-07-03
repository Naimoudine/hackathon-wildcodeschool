import { Outlet, NavLink } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <aside>
        <nav>
          <div>
            <NavLink to="/">Logo</NavLink>
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
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <button type="button">Log out</button>
          </ul>
        </nav>
      </aside>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
