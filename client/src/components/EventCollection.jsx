import PropTypes from "prop-types";
import styles from "./EventCollection.module.css";

export default function EventCollection({ children }) {
  return <div className={styles.eventCollection}>{children}</div>;
}

EventCollection.propTypes = {
  children: PropTypes.element,
};
