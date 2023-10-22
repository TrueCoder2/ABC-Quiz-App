import "./style.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import data from "./components/Data";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("₹ 0");

 

  const moneyPyramid = useMemo(
    () =>
    [
      { id:1, amount: "₹ 5,000"},
      { id:2, amount: "₹ 10,000"},
      { id:3, amount: "₹ 20,000"},
      { id:4, amount: "₹ 40,000"},
      { id:5, amount: "₹ 80,000"},
      { id:6, amount: "₹ 1,60,000"},
      { id:7, amount: "₹ 3,20,000"},
      { id:8, amount: "₹ 6,40,000"},
      { id:9, amount: "₹ 12,50,000"},
      { id:10, amount: "₹ 25 Lakhs"},
      { id:11, amount: "₹ 50 Lakhs"},
      { id:12, amount: "₹ 1 Crore"},
      { id:13, amount: "₹ 3 Crore"},
      { id:14, amount: "₹ 7 Crore"},
      { id:15, amount: "₹ 15 Crore"},
    ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">Aapne jeeti hai kul: {earned} Raashi</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  } liitem
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span> &nbsp;   🔸  &nbsp;  &nbsp; &nbsp; </span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

