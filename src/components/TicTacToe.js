import React, { useRef, useState } from "react";
import "./styles/TicTacToe.css";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const TicTacToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const titleRef = useRef(null);
  const { width, height } = useWindowSize();

  const toggle = (index) => {
    if (lock || data[index] !== "") return;

    const newData = [...data];
    newData[index] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[b] === newData[c]
      ) {
        won(newData[a]);
        break;
      }
    }
  };

  const won = (player) => {
    setLock(true);
    setWinner(player); // for confetti
    const icon = player === "x" ? crossIcon : circleIcon;
    titleRef.current.innerHTML = `Congratulations: <img src="${icon}" height="30" width="30" /> wins`;
  };

  const resetBoard = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(null);
    titleRef.current.innerHTML = "Tic Tac Toe";
  };

  const renderIcon = (value) => {
    if (value === "x") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img src={crossIcon} alt="X" height="70px" width="70px" />
        </div>
      );
    } else if (value === "o") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img src={circleIcon} alt="O" height="70px" width="70px" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      {winner && <Confetti width={width} height={height} />}
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe
      </h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes"
                  onClick={() => toggle(index)}
                >
                  {renderIcon(data[index])}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="resetDiv">
        <button className="reset" onClick={resetBoard}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
