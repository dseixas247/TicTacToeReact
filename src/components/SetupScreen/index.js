import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

function SetupScreen({nameOne, nameTwo, updateGameState, updateSetup}) { 

    const updateName = (key, name) => {
        updateGameState(key, name);
    }

    const start = () => {
        updateSetup();
    }

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
            <div className={styles.button} onClick={() => start()}>
                Play
            </div>
        </div>
    )
}

export default SetupScreen;