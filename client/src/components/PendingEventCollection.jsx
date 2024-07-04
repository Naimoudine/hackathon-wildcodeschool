import PropTypes from "prop-types";
import styles from "./PendingEventCollection.module.css";

export default function PendingEventCollection({ children }) {
  return <div className={styles.collection}>{children}</div>;
}

PendingEventCollection.propTypes = {
  children: PropTypes.element.isRequired,
};
