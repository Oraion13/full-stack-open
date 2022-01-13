import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducer/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes));

  const Vote = (id) => {
    console.log("vote", id);
    dispatch(vote(id));
  };
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => Vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
