import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);

  const [author, setAuthor] = useState(null);
  const [born, setBorn] = useState(0);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name: author.value, setBornTo: Number(born) } });

    setAuthor("");
    setBorn(0);
  };
  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <div>loading...</div>;
  }

  const options = authors.data.allAuthors.map((author) => {
    const auth = {
      value: author.name,
      label: author.name,
    };
    return auth;
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="edit-author">
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <Select
            id="author-name"
            onChange={setAuthor}
            options={options}
            required
          />
          <label htmlFor="author-birthyear">born</label>
          <input
            type="number"
            id="author-birthyear"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
            required
          />
          <button type="submit">update birthyear</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;