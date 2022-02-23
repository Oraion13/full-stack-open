import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/login";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const client = useApolloClient();

  const logout = () => {
    setToken("");
    localStorage.removeItem("library-user");
    client.resetStore();
  };

  useEffect(() => {
    if(localStorage.getItem("library-user")){
      setToken(localStorage.getItem("library-user"))
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <p id="error-message">{errorMsg}</p>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} token={token} />

      <Login
        show={page === "login"}
        setToken={setToken}
        setErrorMsg={setErrorMsg}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};

export default App;
