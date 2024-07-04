import { useState } from "react";
import EventCollection from "../../components/EventCollection";
import PendingEventCollection from "../../components/PendingEventCollection";
import styles from "./Events.module.css";

export default function Events() {
  const [showPending, setShowPending] = useState(false);

  return (
    <div className={styles.events}>
      <h1>Events</h1>
      <div className={styles.cta}>
        <button
          type="button"
          className={!showPending ? styles.active : ""}
          onClick={() => setShowPending(false)}
        >
          Tout
        </button>
        <button
          type="button"
          className={showPending ? styles.active : ""}
          onClick={() => setShowPending(true)}
        >
          En attente
        </button>
      </div>
      <div>
        {!showPending ? (
          <EventCollection>
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
          </EventCollection>
        ) : (
          <PendingEventCollection>
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
                <button type="button" className={styles.cardBtn}>
                  approve
                </button>
                <button type="button" className={styles.cardBtn}>
                  decline
                </button>
              </div>
            </div>
          </PendingEventCollection>
        )}
      </div>
    </div>
  );
}
