import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default function Card({
  status,
  title,
  description,
  id,
  setEventAction,
}) {
  const handleCardValidation = async (e) => {
    const action = e.target.innerText;
    const eventId = Number(e.target.id);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isValidated: action === "accepter" ? true : false,
          }),
        }
      );
      if (res.status === 204) {
        setEventAction(true);
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
          <div>
            <div className={styles.cardImg} />
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardDesc}>{description}</p>
          </div>
          <button type="button" className={styles.cardBtn}>
            Details
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <div>
            <div className={styles.cardImg} />
            <div>
              <p className={styles.cardTitle}>{title}</p>
              <p className={styles.cardDesc}>{description}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: "0.25rem",
            }}
          >
            <button
              type="button"
              className={styles.cardBtn}
              onClick={(e) => handleCardValidation(e)}
              id={id}
            >
              accepter
            </button>
            <button
              type="button"
              className={styles.cardBtn}
              onClick={(e) => handleCardValidation(e)}
              id={id}
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setEventAction: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
