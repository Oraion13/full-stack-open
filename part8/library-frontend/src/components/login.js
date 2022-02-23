import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = ({ setToken, setErrorMsg, setPage, page }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMsg(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user", token);
    }
  }, [result.data, setToken]);

  const submit = (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setPage("authors");
  };

  return (
    <div style={{ display: page !== "login" ? "none" : "" }}>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">username</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
