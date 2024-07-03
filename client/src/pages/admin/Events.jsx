import EventCollection from "../../components/EventCollection";
import PendingEventCollection from "../../components/PendingEventCollection";
import styles from "./Events.module.css";

export default function Events() {
  return (
    <div className={styles.events}>
      <h1>Events</h1>
      <div className={styles.cta}>
        <button type="button">All</button>
        <button type="button">Pending</button>
      </div>
      <div>
        <EventCollection>
          <div
            style={{
              maxWidth: "350px",
              border: "2px solid black",
              padding: "0.5rem",
              borderRadius: "1rem",
              textAlign: "center",
              display: "none",
            }}
          >
            <div
              style={{
                height: "180px",
                width: "100%",
                backgroundColor: "red",
                borderRadius: "1rem",
                marginBottom: "0.25rem",
              }}
            />
            <div>
              <p
                style={{
                  marginBottom: "0.25rem",
                  borderBottom: "2px solid purple",
                  textAlign: "start",
                }}
              >
                Titre
              </p>
              <p
                style={{
                  marginBottom: "0.5rem",
                  textAlign: "start",
                  fontSize: "0.825rem",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio
                debitis commodi sit voluptatum incidunt alias!
              </p>
            </div>
            <button
              type="button"
              style={{
                display: "inline-block",
                margin: "0 auto",
                borderRadius: "0.5rem",
                color: "white",
                backgroundColor: "purple",
              }}
            >
              Détails
            </button>
          </div>
        </EventCollection>
        <PendingEventCollection>
          <div
            style={{
              maxWidth: "350px",
              border: "2px solid black",
              padding: "0.5rem",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                height: "180px",
                width: "100%",
                backgroundColor: "red",
                borderRadius: "1rem",
                marginBottom: "0.25rem",
              }}
            />
            <div>
              <p
                style={{
                  marginBottom: "0.25rem",
                  borderBottom: "2px solid purple",
                }}
              >
                Titre
              </p>
              <p
                style={{
                  marginBottom: "0.5rem",
                  fontSize: "0.825rem",
                }}
              >
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
                style={{
                  borderRadius: "0.5rem",
                  color: "white",
                  backgroundColor: "purple",
                }}
              >
                approve
              </button>
              <button
                type="button"
                style={{
                  borderRadius: "0.5rem",
                  color: "white",
                  backgroundColor: "purple",
                }}
              >
                decline
              </button>
            </div>
          </div>
        </PendingEventCollection>
      </div>
    </div>
  );
}
