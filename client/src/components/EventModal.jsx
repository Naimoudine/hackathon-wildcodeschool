import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./EventModal.module.css";

export default function EventModal({
  showModal,
  setShowModal,
  user,
  setEventAction,
}) {
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          title: formRef.current.title.value,
          description: formRef.current.description.value,
          calendar: formRef.current.calendar.value,
        }),
      });
      if (res.status === 201) {
        navigate("/dashboard", { state: user });
        setShowModal(false);
        setEventAction(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={styles.eventModal}
      style={showModal ? { display: "flex" } : { display: "none" }}
    >
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(false)} />
        <label htmlFor="">
          title:
          <input type="text" name="title" />
        </label>
        <label htmlFor="description">
          description:
          <textarea name="description" />
        </label>
        <label htmlFor="">
          date:
          <input type="datetime-local" name="calendar" id="" />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

EventModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    handicap: PropTypes.string,
    is_Admin: PropTypes.bool,
  }).isRequired,
  setEventAction: PropTypes.func.isRequired,
};
