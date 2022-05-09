import React, { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import styles from "./styles.module.scss";

function SetupScreen({nameOne, nameTwo, saveFile, updateGameState, updateSetup, updateSave, loadSave}) { 
    const cookies = new Cookies();

    const startNewGame = () => {
        updateSave(true);
        updateSetup();
    }

    const continueGame = () => {
        loadSave(saveFile.gameState, saveFile.currentPlayer, saveFile.activeGame,
            saveFile.gameWon, saveFile.fullGames, saveFile.winner);
        updateSetup();
    }

    const deleteSaveFile = () => {
        cookies.remove('gameState');
        cookies.remove('currentPlayer');
        cookies.remove('activeGame');
        cookies.remove('gameWon');
        cookies.remove('fullGames');
        cookies.remove('winner');
        window.location.href = '/';
    }

    if(saveFile.gameState != undefined){
        return(
            <div className={styles.window}>
                <div className={styles.titleBox}>
                    <div className={styles.title}>Ultimate TicTacToe</div>
                    <div className={styles.subtitle}>made with React</div>   
                </div>
                <div className={styles.title}>Continue last game?</div>
                <div className={styles.choices}>
                    <div className={styles.button} onClick={() => continueGame()}>
                        Yes
                    </div>
                    <div className={styles.button} onClick={() => deleteSaveFile()}>
                        No
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className={styles.window}>
                <div className={styles.titleBox}>
                    <div className={styles.title}>Ultimate TicTacToe</div>
                    <div className={styles.subtitle}>made with React</div>
                </div>
                <div className={styles.nameInputs}>
                    <input className={styles.playerOne} type="text" value={nameOne} onChange={e => updateGameState('player1', e.target.value)}/>
                    <input className={styles.playerTwo} type="text" value={nameTwo} onChange={e => updateGameState('player2', e.target.value)}/>
                </div>
                <div className={styles.button} onClick={() => startNewGame()}>
                    Play
                </div>
            </div>
        )
    }
    
}

export default SetupScreen;