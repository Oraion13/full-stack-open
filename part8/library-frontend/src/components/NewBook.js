import React, { useState } from "react";
import { ADD_BOOK, ALL_CACHE } from "../queries";
import { useMutation } from "@apollo/client";
import SetBirthYear from "./setBirthYear";
import { updateCache } from "../App";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.error(error);
    },
    update: (cache, response) => {
      console.log("Im cache");
      console.log("response", response);
      updateCache(
        cache,
        { query: ALL_CACHE, variables: { genre: "" } },
        response.data.addBook
      );

      // cache.updateQuery(
      //   { query: ALL_CACHE, variables: { genre: "" } },
      //   (data) => {
      //     const foundAuthor = data.allAuthors.find(
      //       (author) => author.id === response.data.addBook.author.id
      //     );

      //     return {
      //       allAuthors: foundAuthor
      //         ? data.allAuthors.map((author) =>
      //             author.id === response.data.addBook.author.id
      //               ? response.data.addBook.author
      //               : author
      //           )
      //         : data.allAuthors.concat(response.data.addBook.author),
      //       allBooks: data.allBooks.concat(response.data.addBook)
      //     };
      //   }
      // );
    },

  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    await createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>

      <SetBirthYear />
    </div>
  );
};

export default NewBook;
