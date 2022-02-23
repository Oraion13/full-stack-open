import React from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const Recommend = (props) => {
  const user = useQuery(ME);
  const books = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (books.loading || user.loading) {
    return <div>loading...</div>;
  }

  if (!localStorage.getItem("library-user")) {
    return <div>no user loggedin</div>;
  }

  console.log(user);

  return (
    <div>
      <h2>books</h2>
      <p>
        books in your favourite genre{" "}
        <b>{user.data.me ? user.data.me.favoriteGenre : ""}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) =>
            a.genres.includes(
              user.data.me ? user.data.me.favoriteGenre : ""
            ) ? (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
