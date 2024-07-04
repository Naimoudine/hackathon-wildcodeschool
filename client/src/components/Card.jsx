import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default function Card({ status }) {
  const handleCardValidation = async (e) => {
    const action = e.target.innerText;
    const id = Number(e.target.id);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isValidated: action === "accepter" ? true : false,
          }),
        }
      );
      if (res.status === 204) {
        window.location.reload();
      } else {
        console.info(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {status !== "pending" ? (
        <div className={styles.card}>
          <div className={styles.cardImg} />
          <div>
            <p className={styles.cardTitle}>Titre</p>
            <p className={styles.cardDesc}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
              debitis commodi sit voluptatum incidunt alias!
            </p>
          </div>
          <button type="button" className={styles.cardBtn}>
            Détails
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.cardImg} />
          <div>
            <p className={styles.cardTitle}>Titre</p>
            <p className={styles.cardDesc}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
              debitis commodi sit voluptatum incidunt alias!
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.25rem",
            }}
          >
            <button
              type="button"
              className={styles.cardBtn}
              onClick={(e) => handleCardValidation(e)}
              id="1"
            >
              accepter
            </button>
            <button
              type="button"
              className={styles.cardBtn}
              onClick={(e) => handleCardValidation(e)}
              id="1"
            >
              décliner
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  status: PropTypes.string.isRequired,
};
