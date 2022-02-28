import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommend from "./components/recommend";
import { ALL_CACHE, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  // cache.updateQuery(query, (data) => {
  //   console.log(addedBook);
  //   console.log(data);
  //   return {
  //     allAuthors: uniqByName(data.allAuthors.concat(addedBook.author)),
  //     allBooks: uniqByName(data.allBooks.concat(addedBook)),
  //   };
  // });

  cache.updateQuery(query, (data) => {
    console.log("added book", addedBook);
    console.log("data", data);
    const foundAuthor = data.allAuthors.find(
      (author) => author.id === addedBook.author.id
    );

    return {
      allAuthors: foundAuthor
        ? data.allAuthors.map((author) =>
            author.id === addedBook.author.id ? addedBook.author : author
          )
        : data.allAuthors.concat(addedBook.author),
      allBooks: data.allBooks.find((book) => book.id === addedBook.id)
        ? data.allBooks
        : data.allBooks.concat(addedBook),
    };
  });
};

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
    if (localStorage.getItem("library-user")) {
      setToken(localStorage.getItem("library-user"));
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} is added!!!`);
      updateCache(
        client.cache,
        { query: ALL_CACHE, variables: { genre: "" } },
        subscriptionData.data.bookAdded
      );
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <p id="error-message">{errorMsg}</p>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} token={token} setErrorMsg={setErrorMsg} />

      <Recommend show={page === "recommend"} />

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
