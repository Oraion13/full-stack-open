const NewBlog = (props) => {
  return (
    <form onSubmit={props.handleCreateBlog}>
      <label htmlFor="title">title</label>
      <input
        type="text"
        id="title"
        value={props.title}
        onChange={props.addTitle}
        name="title"
        required
      />
      <label htmlFor="author">author</label>
      <input
        type="text"
        id="author"
        value={props.author}
        onChange={props.addAuthor}
        name="author"
        required
      />
      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        value={props.url}
        onChange={props.addURL}
        name="url"
        required
      />
      <button type="submit">create</button>
    </form>
  );
};

export default NewBlog;
