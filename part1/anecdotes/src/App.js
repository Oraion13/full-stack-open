import React, { useState } from "react";

const Display = ({ anecdotes, dote, vote }) => {
  if (vote === undefined) {
    return <div>{anecdotes[dote]}</div>;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[dote]}</div>
      <div>has {vote[dote]} votes</div>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const select = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  const yourVote = () => {
    let copy = [...vote];
    copy[selected] += 1;
    console.log("copy: ", copy);
    setVote(copy);
  };

  console.log("vote: ", vote);

  const max = vote.indexOf(Math.max(...vote));
  console.log(max);

  return (
    <>
      <>
        <Display anecdotes={anecdotes} dote={selected} vote={vote} />
      </>
      <>
        <Button onClick={yourVote} text="vote" />
        <Button onClick={select} text="next anecdote" />
      </>
      <h2>Anecdote with most votes</h2>
      <Display anecdotes={anecdotes} dote={max} />
    </>
  );
};

export default App;
