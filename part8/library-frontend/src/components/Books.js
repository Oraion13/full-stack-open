import React, { useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import Select from "react-select";

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  const options = [
    { value: "refactoring", label: "refactoring" },
    { value: "agile", label: "agile" },
    { value: "patterns", label: "patterns" },
    { value: "design", label: "design" },
    { value: "crime", label: "crime" },
    { value: "classic", label: "classic" },
    { value: "all genres", label: "all genres" },
    { value: "mystery", label: "mystery" },
    { value: "fantasy", label: "fantasy" },
    { value: "anime", label: "anime" },
  ];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => a.genres.includes(genre) ? (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ) : "")}
        </tbody>
      </table>

      <Select
          id="genre"
          onChange={setGenre}
          options={options}
          required
        />
    </div>
  );
};

export default Books;
