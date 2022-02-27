import React, { useState } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import Select from "react-select";

const Books = (props) => {
  const [genre, setGenre] = useState({ value: "", label: "all" });
  const allBooks = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre.value,
    },
  });

  if (!props.show) {
    return null;
  }

  if (allBooks.loading) {
    return <div>loading...</div>;
  }

  const options = [
    { value: "", label: "all" },
    { value: "refactoring", label: "refactoring" },
    { value: "agile", label: "agile" },
    { value: "patterns", label: "patterns" },
    { value: "design", label: "design" },
    { value: "crime", label: "crime" },
    { value: "classic", label: "classic" },
    { value: "mystery", label: "mystery" },
    { value: "fantasy", label: "fantasy" },
    { value: "anime", label: "anime" },
  ];

  return (
    <div>
      <h2>books</h2>
      {genre.label !== "all" ? (
        <p>
          in genre <b>{genre.label}</b>
        </p>
      ) : (
        ""
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Select id="genre" onChange={setGenre} options={options} required />
    </div>
  );
};

export default Books;
