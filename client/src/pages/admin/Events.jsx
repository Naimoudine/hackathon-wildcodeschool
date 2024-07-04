import { useState } from "react";
import EventCollection from "../../components/EventCollection";
import PendingEventCollection from "../../components/PendingEventCollection";
import styles from "./Events.module.css";
import Card from "../../components/Card";

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
            <Card status="" />
          </EventCollection>
        ) : (
          <PendingEventCollection>
            <Card status="pending" />
          </PendingEventCollection>
        )}
      </div>
    </div>
  );
}
