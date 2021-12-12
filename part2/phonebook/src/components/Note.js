const Note = (props) => (
  <tr>
    <td>{props.name}</td>
    <td>{props.number}</td>
    <td>
      <button value={props.id} name={props.name} onClick={props.deleteContact}>
        delete
      </button>
    </td>
  </tr>
);

export default Note;
