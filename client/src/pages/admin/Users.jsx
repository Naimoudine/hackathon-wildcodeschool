import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Users.module.css";

export default function Users() {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();

  const location = useLocation();
  const { setShowUserModal, userAction, setUserAction } = useOutletContext();

  useEffect(() => {
    setCurrentUser(location.state.user);
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
        if (res.status === 200) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [userAction]);

  const handleDelete = async (e) => {
    const userId = e.currentTarget.id;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        setUserAction(true);
      }
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setUserAction(false);
    }, 100);
  };

  return (
    <div className={styles.users}>
      <h1>Utilisateurs</h1>
      <div className={styles.cta}>
        <button
          type="button"
          className={styles.active}
          onClick={() => setShowUserModal(true)}
        >
          Créer utilisateur
        </button>
      </div>
      <div className={styles.usersContainer}>
        <section>
          <h2>Utilisateur connecté</h2>
          {users
            ?.filter((user) => user.id === currentUser.id)
            .map((user) => (
              <div
                key={user.id}
                style={{
                  border: "2px solid black",
                  width: "fit-content",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <div>
                  <p>Nom: {user.lastname}</p>
                  <p>Prénom: {user.firstname}</p>
                  <p>Coureil: {user.email}</p>
                  {user.handicap ? <p>handicap: {user.handicap}</p> : ""}
                  {user.is_admin ? <p>role: admin</p> : <p>role: employé</p>}
                </div>
              </div>
            ))}
        </section>
        <section>
          <h2>Autres utilisateurs</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {users
              ?.filter((user) => user.id !== currentUser.id)
              .map((user) => (
                <div key={user.id} className={styles.card}>
                  <div>
                    <p>Nom: {user.lastname}</p>
                    <p>Prénom: {user.firstname}</p>
                    <p>Coureil: {user.email}</p>
                    {user.handicap ? <p>handicap: {user.handicap}</p> : ""}
                    {user.is_admin ? <p>role: admin</p> : <p>role: employé</p>}
                  </div>
                  <div>
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={(e) => handleDelete(e)}
                      id={user.id}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button aria-label="Edit" type="button" id={user.id}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
