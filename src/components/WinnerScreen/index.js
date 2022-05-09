import React, { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import styles from "./styles.module.scss";

function WinnerScreen({winner, nameOne, nameTwo}) {
    const cookies = new Cookies();

    const restart = () => {
        cookies.set('restart', true);
        cookies.set('gameState', {
            player1: nameOne,
            player2: nameTwo,
            game1: [0,0,0, 0,0,0, 0,0,0],
            game2: [0,0,0, 0,0,0, 0,0,0],
            game3: [0,0,0, 0,0,0, 0,0,0],
            game4: [0,0,0, 0,0,0, 0,0,0],
            game5: [0,0,0, 0,0,0, 0,0,0],
            game6: [0,0,0, 0,0,0, 0,0,0],
            game7: [0,0,0, 0,0,0, 0,0,0],
            game8: [0,0,0, 0,0,0, 0,0,0],
            game9: [0,0,0, 0,0,0, 0,0,0]
        })
        if(winner==1){
            cookies.set('currentPlayer', 2);
        }
        if(winner==2){
            cookies.set('currentPlayer', 1);
        }
        if(winner==3){
            cookies.set('currentPlayer', Math.floor(Math.random() * 2)+1)
        }
        cookies.set('activeGame', 'all');
        cookies.set('gameWon', [0,0,0, 0,0,0, 0,0,0]);
        cookies.set('fullGames', [false,false,false, false,false,false, false,false,false]);
        cookies.set('winner', 0);
        window.location.href = "/"
    }

    const mainMenu = () => {
        cookies.remove('gameState');
        
        window.location.href = "/"
    }

    return(
        <div className={`${styles.window} ${winner==0 ? styles.hidden : ''} ${winner==3 ? styles.draw : ''}
        ${winner==1 ? styles.playerOneWins : ''} ${winner==2 ? styles.playerTwoWins : ''}`}>
            {`${winner==1 ?  nameOne + ' Wins' : ''}`}
            {`${winner==2 ? nameTwo + ' Wins' : ''}`}
            {`${winner==3 ? 'Draw' : ''}`}
            <div className={styles.choices}>
                <div className={styles.button} onClick={() => restart()}>
                    Play Again
                </div>
                <div className={styles.button} onClick={() => mainMenu()}>
                    Main Menu
                </div>
            </div>
        </div>
    )
}

export default WinnerScreen;