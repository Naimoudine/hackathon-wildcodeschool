import PropTypes from "prop-types";

export default function EventCollection({ children }) {
  return <div>{children}</div>;
}

EventCollection.propTypes = {
  children: PropTypes.element.isRequired,
};
