import { useState, useRef } from "react";
import { useValidation } from "./hooks/useValidation";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const emailField = useRef();
  const passwordField = useRef();
  const {
    hiddenError: emailHiddenError,
    text: emailError,
    checkError: checkEmailError
  } = useValidation(emailField);
  const {
    hiddenError: passwordHiddenError,
    checkError: checkPasswordError,
    text: passwordError
  } = useValidation(passwordField);

  const login = async () => {
    setLoading(true);
    try {
      await fetch("https://dummyjson.com/test")
        .then(res => res.json())
        .then(console.log);
      setLoading(false);
    } catch (e) {
      console.error("API REQUEST ERROR: ", e.message);
      setLoading(false);
    }
  };

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    const setValue = name === "email" ? setEmail : setPassword;
    setValue(value);
  };

  const submitDisabled =
    !email ||
    !password ||
    emailError ||
    passwordError ||
    emailHiddenError ||
    passwordHiddenError ||
    loading;

  const keyDownHandler = (e, checkError) => {
    const {
      target: { name },
      keyCode
    } = e;

    if (keyCode === 13) {
      if (name === "email") {
        if (!emailHiddenError && email) {
          if (!password || passwordHiddenError) {
            passwordField.current.focus();
          } else {
            login();
          }
        } else checkError();
      } else {
        if (!passwordHiddenError && !emailHiddenError && password) {
          login();
        } else checkError();
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">You Brand LLC</header>
      <div className="login-form">
        {loading ? <div className="spin" /> : null}
        <div className="inputBlock">
          <input
            id="emailInput"
            name="email"
            type="email"
            onChange={handleChange}
            ref={emailField}
            onKeyDown={e => keyDownHandler(e, checkEmailError)}
            value={email}
            placeholder="Email"
          />
          {emailError ? <div className="alarm">{emailError}</div> : null}
        </div>
        <div className="inputBlock">
          <input
            type="password"
            name="password"
            id="pwdInput"
            onChange={handleChange}
            ref={passwordField}
            onKeyDown={e => keyDownHandler(e, checkPasswordError)}
            value={password}
            minLength={3}
            placeholder="Password"
          />
          {passwordError ? <div className="alarm">{passwordError}</div> : null}
        </div>
        <button onClick={login} disabled={submitDisabled}>
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
