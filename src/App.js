import { useState } from "react";
import Input from "./components/Input/Input";
import styles from "./App.module.scss";
import MessageBlock from "./components/MessageBlock/MessageBlock";

function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(null);
  const { email, password } = form;

  const login = async () => {
    setLoading(true);
    setRequestSuccess(null);
    try {
      await fetch("https://dummyjson.com/test")
        .then(res => res.json())
        .then(console.log);
      setLoading(false);
      setRequestSuccess(true);
    } catch (e) {
      console.error("API REQUEST ERROR: ", e.message);
      setLoading(false);
      setRequestSuccess(false);
    }
  };

  const handleChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const submitDisabled = !email || !password || loading;
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>You Brand LLC</header>
      <div className={styles.loginForm}>
        {loading ? <div className={styles.spin} /> : null}
        <Input
          formValue={email}
          onFormChange={handleChange}
          login={login}
          placeholder="Email"
          name="email"
          type="email"
        />
        <Input
          formValue={password}
          onFormChange={handleChange}
          login={login}
          placeholder="Password"
          name="password"
          type="password"
          validation={{ minLength: 3 }}
        />

        <button disabled={submitDisabled} onClick={login}>
          Login
        </button>

        <MessageBlock requestSuccess={requestSuccess} />
      </div>
    </div>
  );
}

export default App;
