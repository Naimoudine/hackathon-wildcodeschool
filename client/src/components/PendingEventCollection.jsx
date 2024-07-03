import PropTypes from "prop-types";

export default function PendingEventCollection({ children }) {
  return <div>{children}</div>;
}

PendingEventCollection.propTypes = {
  children: PropTypes.element.isRequired,
};
