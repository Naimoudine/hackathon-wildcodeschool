import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./UserModal.module.css";

export default function UserModal({
  showUserModal,
  setShowUserModal,
  user,
  setUserAction,
}) {
  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formRef.current.firstname.value,
          lastname: formRef.current.lastname.value,
          email: formRef.current.email.value,
          handicap: formRef.current.handicap.value,
          isAdmin: formRef.current.role.value === "admin" ? true : false,
        }),
      });
      if (res.status === 201) {
        navigate("/dashboard/users", { state: user });
        setShowUserModal(false);
        setUserAction(true);
        formRef.current.firstname.value = "";
        formRef.current.lastname.value = "";
        formRef.current.email.value = "";
        formRef.current.handicap.value = "";
        formRef.current.role.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={styles.userModal}
      style={showUserModal ? { display: "flex" } : { display: "none" }}
    >
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setShowUserModal(false)}
        />
        <label htmlFor="">
          firstname:
          <input type="text" name="firstname" />
        </label>
        <label htmlFor="description">
          lastname
          <input type="text" name="lastname" />
        </label>
        <label htmlFor="">
          email
          <input type="email" name="email" />
        </label>
        <label htmlFor="">
          if handicap:
          <input type="text" name="handicap" />
        </label>
        <label htmlFor="role">
          role:
          <select name="role">
            <option value="employé">employé</option>
            <option value="admin">admin</option>
          </select>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
