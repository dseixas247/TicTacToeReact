import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import Symbol from "../Symbol";

function Game({name, player, gameState, gameWon, fullGames, activeGame, 
    updateCurrentPlayer, updateGameState, updateGameWon, updateFullGames, updateActiveGame, updateSave}) {
    const game = parseInt(name.replace("game", ""));
    
    const update = (position) => {
        if(activeGame == "all" && gameWon[game-1]==0 || activeGame == game && gameWon[game-1]==0){
            var state = gameState;
            var full = true;

            if(state[position-1]==0){
                state[position-1] = player;
                if(
                    state[0]==1 && state[1]==1 && state[2]==1 ||
                    state[3]==1 && state[4]==1 && state[5]==1 ||
                    state[6]==1 && state[7]==1 && state[8]==1 ||

                    state[0]==1 && state[3]==1 && state[6]==1 ||
                    state[1]==1 && state[4]==1 && state[7]==1 ||
                    state[2]==1 && state[5]==1 && state[8]==1 ||

                    state[0]==1 && state[4]==1 && state[8]==1 ||
                    state[2]==1 && state[4]==1 && state[6]==1 ||

                    state[0]==2 && state[1]==2 && state[2]==2 ||
                    state[3]==2 && state[4]==2 && state[5]==2 ||
                    state[6]==2 && state[7]==2 && state[8]==2 ||

                    state[0]==2 && state[3]==2 && state[6]==2 ||
                    state[1]==2 && state[4]==2 && state[7]==2 ||
                    state[2]==2 && state[5]==2 && state[8]==2 ||

                    state[0]==2 && state[4]==2 && state[8]==2 ||
                    state[2]==2 && state[4]==2 && state[6]==2
                ){
                    updateGameWon(player, game);
                }
                state.forEach(element => {
                    if(element == 0){
                        full = false;
                    }
                })
                
                if(full){
                    updateFullGames(game);
                }
                updateActiveGame(position);
                updateGameState(name, state);
                updateCurrentPlayer();
                updateSave();
            }
        }
    }

    return(
            <table className={`${styles.Game} ${player==1 ? styles.symbolOne : styles.symbolTwo} 
            ${activeGame == "all" && gameWon[game-1]==0 && !fullGames[game-1] || activeGame == game ? styles.active : ''}`}>
                <tbody>
                    <tr>
                        <td onClick={() => update(1)}>
                            <Symbol content={gameState[0]}/>
                        </td>
                        <td onClick={() => update(2)}>
                            <Symbol content={gameState[1]}/>
                        </td>
                        <td onClick={() => update(3)}>
                            <Symbol content={gameState[2]}/>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={() => update(4)}>
                            <Symbol content={gameState[3]}/>
                        </td>
                        <td onClick={() => update(5)}>
                            <Symbol content={gameState[4]}/>
                        </td>
                        <td onClick={() => update(6)}>
                            <Symbol content={gameState[5]}/>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={() => update(7)}>
                            <Symbol content={gameState[6]}/>
                        </td>
                        <td onClick={() => update(8)}>
                            <Symbol content={gameState[7]}/>
                        </td>
                        <td onClick={() => update(9)}>
                            <Symbol content={gameState[8]}/>
                        </td>
                    </tr>
                </tbody>
            </table>
    );
}
export default Game;