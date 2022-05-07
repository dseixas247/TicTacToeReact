import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

import Symbol from "../Symbol";

function Game({name, player, gameState, activeGame, updateCurrentPlayer, updateGameState, updateActiveGame}) {

    const update = (position) => {
        const game = parseInt(name.replace("game", ""));
        if(activeGame == "all" || activeGame == game){
            let state = gameState;
            state[position-1] = player;
            updateCurrentPlayer();
            updateActiveGame(position);
            updateGameState(game, state);
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