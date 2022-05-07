import React, { useCallback, useEffect, useRef, useState } from "react";
import './App.css';

import Game from "../components/Game";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameState, setGameState] = useState({
    game1: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game2: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game3: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game4: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game5: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game6: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game7: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game8: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    game9: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  });
  const [activeGame, setActiveGame] = useState(0);

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

  const updateActiveGame = useCallback((game) => {
    setActiveGame(game);
  }, [activeGame]);

  return (
    <div className="App">
      <table>
        <tr>
          <td>
            <Game 
              name="game1" 
              player={currentPlayer}
              gameState={gameState.game1} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
          <td>
            <Game 
              name="game2" 
              player={currentPlayer}
              gameState={gameState.game2}
              activeGame={activeGame} 
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
          <td>
            <Game 
              name="game3" 
              player={currentPlayer}
              gameState={gameState.game3} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Game 
              name="game4" 
              player={currentPlayer}
              gameState={gameState.game4} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
          <td>
            <Game 
              name="game5" 
              player={currentPlayer}
              gameState={gameState.game5} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
          <td>
            <Game 
              name="game6" 
              player={currentPlayer}
              gameState={gameState.game6} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Game 
              name="game7" 
              player={currentPlayer}
              gameState={gameState.game7} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
          <td>
            <Game 
              name="game8" 
              player={currentPlayer}
              gameState={gameState.game8} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
          <td>
            <Game 
              name="game9" 
              player={currentPlayer}
              gameState={gameState.game9} 
              activeGame={activeGame}
              updateCurrentPlayer={updateCurrentPlayer} 
              updateGameState={updateGameState} 
              updateActiveGame={updateActiveGame}
            />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
