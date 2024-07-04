import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventCollection from "../../components/EventCollection";
import PendingEventCollection from "../../components/PendingEventCollection";
import styles from "./Events.module.css";
import Card from "../../components/Card";

export default function Events() {
  const [showPending, setShowPending] = useState(false);
  const { setShowModal } = useOutletContext();
  const [events, setEvents] = useState();

  const { eventAction, setEventAction } = useOutletContext();
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        if (res.status === 200) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getEvents();
  }, [eventAction]);

  return (
    <div className={styles.events}>
      <h1>Events</h1>
      <div className={styles.cta}>
        <div>
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
        <button
          type="button"
          className={styles.active}
          onClick={() => setShowModal(true)}
        >
          Créer évènement
        </button>
      </div>
      <div className={styles.eventsContainer}>
        {!showPending ? (
          <EventCollection>
            {events
              ?.filter((event) => event.is_validated === 1)
              .map((event) => (
                <Card
                  key={event.id}
                  status=""
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  id={event.id}
                />
              ))}
          </EventCollection>
        ) : (
          <PendingEventCollection>
            {events
              ?.filter((event) => event.is_validated === null)
              .map((event) => (
                <Card
                  key={event.id}
                  status="pending"
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  id={event.id}
                  setEventAction={setEventAction}
                />
              ))}
          </PendingEventCollection>
        )}
      </div>
    </div>
  );
}
