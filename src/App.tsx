import React, {useEffect, useState} from 'react';
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Board";
import {Colors} from "./models/Board";
import LostFigures from "./components/LostFigures";

const App = () => {
  const [board, setBrd] = useState(new Board())
  const [wPlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [curPlayer, setCurPlayer] = useState<Player | null>(null);

  function start() { // ф-ця начала игры
    const newBoard = new Board();
    newBoard.intCells()
    newBoard.addFigures()
    setBrd(newBoard)
  }

  function swapPlayer() {
    setCurPlayer(curPlayer?.color === Colors.WHITE ? blackPlayer : wPlayer)
  }
  useEffect(() => {
    start()
    setCurPlayer(wPlayer);
  }, [])


  return (
    <div className="app">
{/*сама доска*/}
      <BoardComponent
        board={board}
        setBoard={setBrd}
        currentPlayer={curPlayer}
        swapPlayer={swapPlayer}
      />
      <div className='hhjj'>
        {/*потерянные фигуры*/}

        <LostFigures 
          title="Black Figures"
          figures={board.lostBlackFigures}
        />{/*Для черных фигурок */}
        <LostFigures
          title="White Figures"
          figures={board.lostWhiteFigures}
        />{/*Для белых фигурок */}
      </div>
    </div>
  );
};

export default App;
