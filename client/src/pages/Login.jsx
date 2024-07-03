import { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./login.module.css";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Login() {
  const errRef = useRef();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg(
      "Merci de renseigner tous les champs en suivant les instructions"
    );
  }, [email, pwd]);

  return (
    <main className={styles.loginMain}>
      <FontAwesomeIcon icon={faArrowLeft} />{" "}
      <section className={styles.loginSection}>
        <p
          ref={errRef}
          className={
            email && (!validEmail || !validPwd) ? styles.errmsg : styles.hide
          }
        >
          {errMsg}
        </p>
        <form className={styles.formLogin}>
          <div>
            <label htmlFor="email">
              Email
              <span className={validEmail ? styles.valid : styles.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validEmail || !email ? styles.hide : styles.invalid}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className={styles.formInput}
              type="email"
              id="email"
              autoComplete="off"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                emailFocus && email && !validEmail
                  ? styles.instructions
                  : styles.hide
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Merci de renseigner votre courriel professionnel
            </p>
          </div>

          <div>
            <label htmlFor="password">
              Code de sécurité
              <span className={validPwd ? styles.valid : styles.hide}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className={styles.formInput}
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              className={
                pwdFocus && !validPwd ? styles.instructions : styles.hide
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 à 24 caractères. <br />
              Merci de renseigner le code de sécurité qui vous a été transmis
              par le service des ressources humaines. <br />
              Caractères autorisés: <span>! @ # $ %</span>
            </p>
          </div>
          <button
            className={styles.loginSubmitButton}
            type="submit"
            disabled={!validEmail || !validPwd}
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
