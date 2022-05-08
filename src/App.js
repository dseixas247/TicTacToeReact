import React, { useCallback, useEffect, useRef, useState } from "react";
import './App.css';

import Game from "./components/Game";
import WinnerScreen from "./components/WinnerScreen";

function App() {
  const [winner, setWinner] = useState(0);

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [gameState, setGameState] = useState({
    game1: [0,0,0, 0,0,0, 0,0,0],
    game2: [0,0,0, 0,0,0, 0,0,0],
    game3: [0,0,0, 0,0,0, 0,0,0],
    game4: [0,0,0, 0,0,0, 0,0,0],
    game5: [0,0,0, 0,0,0, 0,0,0],
    game6: [0,0,0, 0,0,0, 0,0,0],
    game7: [0,0,0, 0,0,0, 0,0,0],
    game8: [0,0,0, 0,0,0, 0,0,0],
    game9: [0,0,0, 0,0,0, 0,0,0]
  });

  const [gameWon, setGameWon] = useState([0,0,0, 0,0,0, 0,0,0]);

  const [activeGame, setActiveGame] = useState('all');

  const updateCurrentPlayer = useCallback(() => {
    if(currentPlayer == 1){
      setCurrentPlayer(2);
    }
    else{
      setCurrentPlayer(1);
    }
  }, [currentPlayer]);

  const updateGameState = useCallback((game, values) => {
    setGameState( prevState => ({
      ...prevState,
      [game]: values
    }));
  }, [gameState]);

  const updateGameWon = useCallback((player, game) => {
    let state = gameWon;
    if(state[game-1]==0){
      state[game-1] = player;
      setGameWon(state);
    }
    if(
      state[0]==1 && state[1]==1 && state[2]==1 ||
      state[3]==1 && state[4]==1 && state[5]==1 ||
      state[6]==1 && state[7]==1 && state[8]==1 ||
      state[0]==1 && state[3]==1 && state[6]==1 ||
      state[1]==1 && state[4]==1 && state[7]==1 ||
      state[2]==1 && state[5]==1 && state[8]==1 ||
      state[0]==1 && state[4]==1 && state[8]==1 ||
      state[2]==1 && state[4]==1 && state[6]==1
    ){
      setWinner(1);
    }
    if(
      state[0]==2 && state[1]==2 && state[2]==2 ||
      state[3]==2 && state[4]==2 && state[5]==2 ||
      state[6]==2 && state[7]==2 && state[8]==2 ||
      state[0]==2 && state[3]==2 && state[6]==2 ||
      state[1]==2 && state[4]==2 && state[7]==2 ||
      state[2]==2 && state[5]==2 && state[8]==2 ||
      state[0]==2 && state[4]==2 && state[8]==2 ||
      state[2]==2 && state[4]==2 && state[6]==2
    ){
      setWinner(2);
    }
  }, [gameWon]);

  const updateActiveGame = useCallback((game) => {
    setActiveGame(game);
  }, [activeGame]);

  return (
    <div className="App">
      <WinnerScreen winner={winner}/>
      <div className={`player playerOne ${currentPlayer==1 ? 'playerActive' : 'playerInactive'}`}>Player1</div>
      <div className={`player playerTwo ${currentPlayer==2 ? 'playerActive' : 'playerInactive'}`}>Player2</div>
      <table className='Games'>
        <tbody>
          <tr>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==1 ? 'gameActive' : ''} 
            ${gameWon[0]==1 ? 'gameWonPOne' : ''} ${gameWon[0]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game1" 
                player={currentPlayer}
                gameState={gameState.game1} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==2 ? 'gameActive' : ''} 
            ${gameWon[1]==1 ? 'gameWonPOne' : ''} ${gameWon[1]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game2" 
                player={currentPlayer}
                gameState={gameState.game2}
                activeGame={activeGame} 
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==3 ? 'gameActive' : ''} 
            ${gameWon[2]==1 ? 'gameWonPOne' : ''} ${gameWon[2]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game3" 
                player={currentPlayer}
                gameState={gameState.game3} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
          </tr>
          <tr>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==4 ? 'gameActive' : ''} 
            ${gameWon[3]==1 ? 'gameWonPOne' : ''} ${gameWon[3]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game4" 
                player={currentPlayer}
                gameState={gameState.game4} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==5 ? 'gameActive' : ''} 
            ${gameWon[4]==1 ? 'gameWonPOne' : ''} ${gameWon[4]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game5" 
                player={currentPlayer}
                gameState={gameState.game5} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==6 ? 'gameActive' : ''} 
            ${gameWon[5]==1 ? 'gameWonPOne' : ''} ${gameWon[5]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game6" 
                player={currentPlayer}
                gameState={gameState.game6} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
          </tr>
          <tr>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==7 ? 'gameActive' : ''} 
            ${gameWon[6]==1 ? 'gameWonPOne' : ''} ${gameWon[6]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game7" 
                player={currentPlayer}
                gameState={gameState.game7} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==8 ? 'gameActive' : ''} 
            ${gameWon[7]==1 ? 'gameWonPOne' : ''} ${gameWon[7]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game8" 
                player={currentPlayer}
                gameState={gameState.game8} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
            <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' || activeGame==9 ? 'gameActive' : ''} 
            ${gameWon[8]==1 ? 'gameWon' : ''} ${gameWon[8]==2 ? 'gameWonPTwo' : ''}`}>
              <Game 
                name="game9" 
                player={currentPlayer}
                gameState={gameState.game9} 
                activeGame={activeGame}
                updateCurrentPlayer={updateCurrentPlayer} 
                updateGameState={updateGameState} 
                updateGameWon={updateGameWon}
                updateActiveGame={updateActiveGame}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App
