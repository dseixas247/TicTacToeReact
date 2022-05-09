import React, { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import './App.css';

import Game from "./components/Game";
import SetupScreen from "./components/SetupScreen";
import WinnerScreen from "./components/WinnerScreen";

function App() {
  const cookies = new Cookies();

  const saveFile = cookies.getAll();

  const [setup, setSetup] = useState(false);

  const [winner, setWinner] = useState(0);

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [gameState, setGameState] = useState({
    player1: 'Player 1',
    player2: 'Player 2',
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

  const [fullGames, setFullGames] = useState([false,false,false, false,false,false, false,false,false]);

  const [gameWon, setGameWon] = useState([0,0,0, 0,0,0, 0,0,0]);

  const [activeGame, setActiveGame] = useState('all');

  const updateCurrentPlayer = useCallback(() => {
    if(currentPlayer == 1){
      setCurrentPlayer(2);
      cookies.set('currentPlayer', 2);
    }
    else{
      setCurrentPlayer(1);
      cookies.set('currentPlayer', 1);
    }
    if(
      fullGames[0] &&
      fullGames[1] &&
      fullGames[2] &&
      fullGames[3] &&
      fullGames[4] &&
      fullGames[5] &&
      fullGames[6] &&
      fullGames[7] &&
      fullGames[8]
    ){
      setWinner(3);
      cookies.set('winner', 3);
    }
  }, [currentPlayer]);

  const updateGameState = useCallback((key, values) => {
    setGameState( prevState => ({
      ...prevState,
      [key]: values
    }));
  }, [gameState]);

  const updateGameWon = useCallback((player, game) => {
    var state = gameWon;
    if(state[game-1]==0){
      state[game-1] = player;
      setGameWon(state);
      updateFullGames(game);
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
      cookies.set('winner', 1);
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
      cookies.set('winner', 2);
    }
  }, [gameWon]);

  const updateActiveGame = useCallback((game) => {
    if(gameWon[game-1]!=0 || fullGames[game-1]){
      setActiveGame('all');
      cookies.set('activeGame', 'all');
    }
    else{
      setActiveGame(game);
      cookies.set('activeGame', game);
    } 
  }, [activeGame]);

  const updateFullGames = useCallback((game) => {
    var state = fullGames;
    state[game-1] = true;
    setFullGames(state);
  }, [fullGames]);

  const updateSetup = useCallback(() => {
    setSetup(!setup);
  }, [setup]);

  const updateSave = useCallback((start) => {
    if(start){
      cookies.set('currentPlayer', 1);
      cookies.set('activeGame', 'all');
      cookies.set('winner', 0);
    }
    cookies.set('gameState', gameState);
    cookies.set('gameWon', gameWon);
    cookies.set('fullGames', fullGames);
  }, [gameState]);

  const loadSave = useCallback((savedGameState, savedCurrentPlayer, savedActiveGame, 
    savedGameWon, savedFullGames, savedWinner) => {
      setGameState(savedGameState);
      setCurrentPlayer(savedCurrentPlayer);
      setActiveGame(savedActiveGame);
      setGameWon(savedGameWon);
      setFullGames(savedFullGames);
      setWinner(savedWinner);
  }, [gameState, currentPlayer, activeGame, gameWon, fullGames, winner])

  if(setup){
    return (
      <div className="App">
        <WinnerScreen winner={winner} nameOne={saveFile.gameState.player1} nameTwo={saveFile.gameState.player2}/>
        <div className={`player playerOne ${currentPlayer==1 ? 'playerActive' : 'playerInactive'}`}>{gameState.player1}</div>
        <div className={`player playerTwo ${currentPlayer==2 ? 'playerActive' : 'playerInactive'}`}>{gameState.player2}</div>
        <table className='Games'>
          <tbody>
            <tr>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[0]==0 && !fullGames[0] || activeGame==1 ? 'gameActive' : ''} 
              ${gameWon[0]==1 ? 'gameWonPOne' : ''} ${gameWon[0]==2 ? 'gameWonPTwo' : ''} ${fullGames[0]==true && gameWon[0]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game1" 
                  player={currentPlayer}
                  gameState={gameState.game1} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[1]==0 && !fullGames[1] || activeGame==2 ? 'gameActive' : ''} 
              ${gameWon[1]==1 ? 'gameWonPOne' : ''} ${gameWon[1]==2 ? 'gameWonPTwo' : ''} ${fullGames[1]==true && gameWon[1]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game2" 
                  player={currentPlayer}
                  gameState={gameState.game2}
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame} 
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[2]==0 && !fullGames[2] || activeGame==3 ? 'gameActive' : ''} 
              ${gameWon[2]==1 ? 'gameWonPOne' : ''} ${gameWon[2]==2 ? 'gameWonPTwo' : ''}${fullGames[2]==true && gameWon[2]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game3" 
                  player={currentPlayer}
                  gameState={gameState.game3} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
            </tr>
            <tr>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[3]==0 && !fullGames[3] || activeGame==4 ? 'gameActive' : ''} 
              ${gameWon[3]==1 ? 'gameWonPOne' : ''} ${gameWon[3]==2 ? 'gameWonPTwo' : ''}${fullGames[3]==true && gameWon[3]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game4" 
                  player={currentPlayer}
                  gameState={gameState.game4} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[4]==0 && !fullGames[4] || activeGame==5 ? 'gameActive' : ''} 
              ${gameWon[4]==1 ? 'gameWonPOne' : ''} ${gameWon[4]==2 ? 'gameWonPTwo' : ''}${fullGames[4]==true && gameWon[4]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game5" 
                  player={currentPlayer}
                  gameState={gameState.game5} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[5]==0 && !fullGames[5] || activeGame==6 ? 'gameActive' : ''} 
              ${gameWon[5]==1 ? 'gameWonPOne' : ''} ${gameWon[5]==2 ? 'gameWonPTwo' : ''}${fullGames[5]==true && gameWon[5]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game6" 
                  player={currentPlayer}
                  gameState={gameState.game6} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
            </tr>
            <tr>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[6]==0 && !fullGames[6] || activeGame==7 ? 'gameActive' : ''} 
              ${gameWon[6]==1 ? 'gameWonPOne' : ''} ${gameWon[6]==2 ? 'gameWonPTwo' : ''}${fullGames[6]==true && gameWon[6]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game7" 
                  player={currentPlayer}
                  gameState={gameState.game7} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[7]==0 && !fullGames[7] || activeGame==8 ? 'gameActive' : ''} 
              ${gameWon[7]==1 ? 'gameWonPOne' : ''} ${gameWon[7]==2 ? 'gameWonPTwo' : ''}${fullGames[7]==true && gameWon[7]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game8" 
                  player={currentPlayer}
                  gameState={gameState.game8} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
              <td className={`${currentPlayer==1 ? 'one' : 'two'} ${activeGame=='all' && gameWon[8]==0 && !fullGames[8] || activeGame==9 ? 'gameActive' : ''} 
              ${gameWon[8]==1 ? 'gameWonPOne' : ''} ${gameWon[8]==2 ? 'gameWonPTwo' : ''}${fullGames[8]==true && gameWon[8]==0 ? 'draw' : ''}`}>
                <Game 
                  name="game9" 
                  player={currentPlayer}
                  gameState={gameState.game9} 
                  gameWon={gameWon}
                  fullGames={fullGames}
                  activeGame={activeGame}
                  updateCurrentPlayer={updateCurrentPlayer} 
                  updateGameState={updateGameState} 
                  updateGameWon={updateGameWon}
                  updateFullGames={updateFullGames}
                  updateActiveGame={updateActiveGame}
                  updateSave={updateSave}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  else{
    return(
      <div className="App">
        <SetupScreen nameOne={gameState.player1} nameTwo={gameState.player2} saveFile={saveFile}
        updateGameState={updateGameState} updateSetup={updateSetup} updateSave={updateSave} loadSave={loadSave}/>
      </div>
    );
  }
}

export default App
