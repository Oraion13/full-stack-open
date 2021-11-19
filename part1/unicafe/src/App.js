import React, { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Display = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h3>No feedback given</h3>
      </>
    );
  }

  const averageGood = good > bad ? good - bad : bad - good;
  const average = (averageGood / (good + neutral + bad)).toFixed(1);
  const positive = ((good / (good + neutral + bad)) * 100).toFixed(1);

  return (
    <>
      <table>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive} %</td>
        </tr>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const forGood = () => setGood(good + 1);
  const forNeutral = () => setNeutral(neutral + 1);
  const forBad = () => setBad(bad + 1);

  return (
    <>
      <h2>Give feedback</h2>
      <Button onClick={forGood} text="good" />
      <Button onClick={forNeutral} text="neutral" />
      <Button onClick={forBad} text="bad" />
      <>
        <h2>Statistics</h2>
      </>
      <Display good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
