/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function Square({ value, onSquareCliked }) {
  return (
    <button
      onClick={onSquareCliked}
      className="border border-gray-400 h-12 w-12 m-1 leading-1 text-lg"
    >
      {value}
    </button>
  );
}

export const Bord = ({ xIsNext, Squares, onplayed }) => {
  const winner = calculateWinner(Squares);
  let status;
  if (winner) {
    status = `winer:${winner}`;
  } else {
    status = "Next player " + (xIsNext ? "X" : "O");
  }

  function handelCliked(i) {
    if (Squares[i] || calculateWinner(Squares)) {
      return;
    }
    // console.log(Squares);
    const nextSquare = Squares.slice();

    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }
    onplayed(nextSquare);
    console.log(nextSquare);
  }
  return (
    <>
      <div> {status} </div>
      <div className="flex ">
        <Square value={Squares[0]} onSquareCliked={() => handelCliked(0)} />
        <Square value={Squares[1]} onSquareCliked={() => handelCliked(1)} />
        <Square value={Squares[2]} onSquareCliked={() => handelCliked(2)} />
      </div>
      <div className="flex">
        <Square value={Squares[3]} onSquareCliked={() => handelCliked(3)} />
        <Square value={Squares[4]} onSquareCliked={() => handelCliked(4)} />
        <Square value={Squares[5]} onSquareCliked={() => handelCliked(5)} />
      </div>
      <div className="flex">
        <Square value={Squares[6]} onSquareCliked={() => handelCliked(6)} />
        <Square value={Squares[7]} onSquareCliked={() => handelCliked(7)} />
        <Square value={Squares[8]} onSquareCliked={() => handelCliked(8)} />
      </div>
    </>
  );
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setxIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquears = history[currentMove];
  console.log(currentSquears);

  function handelPlayed(nextSquare) {
    setxIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  const moves = history.map((squares, move) => {
    let descriptoin;
    if (move > 0) {
      descriptoin = `Go to the move # ${move}`;
    } else {
      descriptoin = `Go to start the game,`;
    }
    function jump(move) {
      setCurrentMove(move);
      setxIsNext(move % 2 === 0);
    }
    return (
      <li key={move}>
        <button onClick={() => jump(move)}> {descriptoin} </button>
      </li>
    );
  });

  return (
    <>
      <div>
        <div>
          <Bord
            xIsNext={xIsNext}
            Squares={currentSquears}
            onplayed={handelPlayed}
          />
        </div>
      </div>
      <div>
        <ol> {moves} </ol>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
