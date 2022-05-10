import React, { useCallback, useEffect, useRef, useState } from "react";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from "universal-cookie";
import styles from "./styles.module.scss";

function SetupScreen({currentPlayer, nameOne, nameTwo, saveFile, updateCurrentPlayer, updateGameState, updateSetup, updateSave, loadSave}) { 
    const cookies = new Cookies();

    var leaderBoard = cookies.get('leaderBoard');
    if(leaderBoard != undefined){
        var leaderBoard = leaderBoard.sort((a,b) => 
            (((b.score[0] - b.score[1]) / (b.score[0] + b.score[1] + b.score[2]))*100) 
            - (((a.score[0] - a.score[1]) / (a.score[0] + a.score[1] + a.score[2]))*100)
        );
    }
    
    const [leaderBoardOpen, setLeaderBoardOpen] = useState(false); 
    const [validNames, setValidNames] = useState(true);

    useEffect(() => {
        if(nameOne == nameTwo || nameOne == '' || nameTwo == ''){
            setValidNames(false);
        }
        else{
            setValidNames(true);
        }
    }, [nameOne, nameTwo])

    const startNewGame = () => {
        if(validNames){
            updateSave(true);
            updateSetup();
        }
    }

    const continueGame = () => {
        loadSave(saveFile.gameState, saveFile.currentPlayer, saveFile.activeGame,
            saveFile.gameWon, saveFile.fullGames, saveFile.winner);
        updateSetup();
    }

    const updateLeaderBoardOpen = useCallback(() => {
        setLeaderBoardOpen(!leaderBoardOpen);
    }, [leaderBoardOpen]);

    const deleteSaveFile = () => {
        cookies.remove('gameState');
        cookies.remove('currentPlayer');
        cookies.remove('activeGame');
        cookies.remove('gameWon');
        cookies.remove('fullGames');
        cookies.remove('winner');
        window.location.href = '/';
    }

    if(saveFile.restart){
        cookies.remove('restart');
        continueGame();
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
        );
    }

    if(leaderBoardOpen && leaderBoard != undefined){
        const leaderBoardContent = leaderBoard.map((item, key) => {
            return(
                <tr key={key}>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.score[0]}
                    </td>
                    <td>
                        {item.score[1]}
                    </td>
                    <td>
                        {item.score[2]}
                    </td>
                    <td>
                        {(item.score[0] / (item.score[0] + item.score[1] + item.score[2])) * 100 + '%'}
                    </td>
                </tr>
            );
        });

        return(
            <div className={styles.leaderBoardWindow}>
                <div className={`${styles.button} ${styles.close}`} onClick={() => updateLeaderBoardOpen()}>
                        <CloseIcon/>
                </div>
                <div className={styles.leaderBoard}>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Wins
                                </th>
                                <th>
                                    Losses
                                </th>
                                <th>
                                    Draws
                                </th>
                                <th>
                                    Win Rate
                                </th>
                            </tr>
                            {leaderBoardContent}
                        </tbody>
                    </table>
                </div> 
            </div>
        );
    }
    else if(leaderBoardOpen){
        return(
            <div className={styles.leaderBoardWindow}>
                <div className={`${styles.button} ${styles.close}`} onClick={() => updateLeaderBoardOpen()}>
                        <CloseIcon/>
                </div>
                <table>
                    <tbody>
                        No registered games yet.
                    </tbody>
                </table>
            </div>
        );
    }
    else{
        return(
            <div className={styles.window}>
                <div className={styles.titleBox}>
                    <div className={styles.title}>Ultimate TicTacToe</div>
                    <div className={styles.subtitle}>made with React</div>
                </div>
                
                <div className={styles.nameInputs}>
                    <input className={styles.playerOne} type="text" value={nameOne} onChange={e => {updateGameState('player1', e.target.value.replace(/\s+/g, ''));}}/>
                    <div className={styles.goesFirst}>
                        {`${currentPlayer==1 ? nameOne : nameTwo}`}
                        <label className={styles.switch}>
                            <input type="checkbox" onClick={() => updateCurrentPlayer()}/>
                            <span className={styles.slider}/>
                        </label>
                        goes first
                    </div>
                    <input className={styles.playerTwo} type="text" value={nameTwo} onChange={e => {updateGameState('player2', e.target.value.replace(/\s+/g, ''));}}/>
                </div>
                <div className={styles.choices}>
                    <div className={`${styles.button} ${styles.leaderBoardButton}`} onClick={() => updateLeaderBoardOpen()}>
                        <LeaderboardIcon/>
                    </div>
                    <div className={validNames ? styles.button : styles.disabledButton} onClick={() => startNewGame()}>
                        Play
                    </div>
                </div>
                
            </div>
        );
    }
    
}

export default SetupScreen;