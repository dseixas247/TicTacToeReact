import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

function WinnerScreen({winner}) {

    const restart = () => {
        window.location.href = "/"
    }

    return(
        <div className={`${styles.window} ${winner==0 ? styles.hidden : ''} ${winner==3 ? styles.draw : ''}
        ${winner==1 ? styles.playerOneWins : ''} ${winner==2 ? styles.playerTwoWins : ''}`}>
            {`${winner==1 ? 'Player1 Wins' : ''}`}
            {`${winner==2 ? 'Player2 Wins' : ''}`}
            {`${winner==3 ? 'Draw' : ''}`}
            <div className={styles.button} onClick={() => restart()}>
                Play Again
            </div>
        </div>
    )
}

export default WinnerScreen;