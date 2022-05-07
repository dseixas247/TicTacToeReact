import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import Symbol from "../Symbol";

function Game({name, player, gameState, activeGame, updateCurrentPlayer, updateGameState, updateGameWon, updateActiveGame}) {

    const update = (position) => {
        const game = parseInt(name.replace("game", ""));
        if(activeGame == "all" || activeGame == game){
            let state = gameState;
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
                    updateGameWon(player, activeGame);
                }
                updateGameState(game, state);
                updateActiveGame(position);
                updateCurrentPlayer();
            }
        }
    }

    return(
            <table className={styles.Game}>
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