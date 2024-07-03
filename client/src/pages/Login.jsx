import { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/login.css";

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
    <main className="flex flex-col relative items-center justify-center lg:flex-row h-screen bg-black">
      <FontAwesomeIcon
        className="h-6 mr-4 cursor-pointer text-primary"
        icon={faArrowLeft}
      />{" "}
      <section className="h-full w-full md:mt-4 lg:w-[45%] min-h-[400px] flex flex-col justify-center items-center p-4 px-8 md:px-16 lg:pl-16 bg-black">
        <p
          ref={errRef}
          className={email && (!validEmail || !validPwd) ? "errmsg" : "hide"}
        >
          {errMsg}
        </p>
        <form>
          <div>
            <label htmlFor="email">
              Email
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
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
                emailFocus && email && !validEmail ? "instructions" : "hide"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Merci de renseigner votre courriel professionnel
            </p>
          </div>

          <div>
            <label htmlFor="password">
              Code de sécurité
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              className="formInput"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p className={pwdFocus && !validPwd ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 à 24 caractères. <br />
              Merci de renseigner le code de sécurité qui vous a été transmis
              par le service des ressources humaines. <br />
              Caractères autorisés: <span>! @ # $ %</span>
            </p>
          </div>
          <button type="submit" disabled={!validEmail || !validPwd}>
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
