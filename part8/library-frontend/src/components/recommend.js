import React, { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const Recommend = (props) => {
  const me = useQuery(ME);
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(!me.loading){
      setUser(me.data.me);
    }
  }, [me.loading]) // eslint-disable-line
  
  const [genre, setGenre] = useState("")
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  if (!props.show) {
    return null;
  }

  if (books.loading || user.loading) {
    return <div>loading...</div>;
  }

  if (!localStorage.getItem("library-user")) {
    return <div>no user loggedin</div>;
  }

  const search = (e) => {
    e.preventDefault();
    setGenre(user ? user.favoriteGenre : "")
  }

  return (
    <div>
      <h2>books</h2>
      <button className="recommended" onClick={search}>recommended</button>
      <p>
        books in your favourite genre{" "}
        <b>{user ? user.favoriteGenre : ""}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
