import { NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import logo from "../assets/images/logo.png";

export default function Home() {
  return (
    <main className={styles.mainHome}>
      <div>
        <img className={styles.homeLogo} src={logo} alt="logo" />
      </div>
      <div className={styles.middleSection}>
        <h1>
          Bienvenue dans le monde <br />{" "}
          <span className={styles.homeSpan}>
            des événements{" "}
            <span className={styles.homeSpanTwo}>inclusifs!</span>
          </span>
        </h1>
        <button type="button" className={styles.homeButton}>
          <NavLink className={styles.homeNavlink} to="/login">
            Connectez <br />
            Vous!
          </NavLink>
        </button>
      </div>
      <div className={styles.bgImg} />
    </main>
  );
}
