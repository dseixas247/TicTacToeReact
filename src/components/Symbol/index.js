import styles from "./styles.module.scss";

function Symbol({content}){
    switch(content){
        case 1:
            return(
                <div className={styles.symbol}>
                    <img src="/Player1Symbol.png" alt="1"/>
                </div>
            );
        case 2:
            return(
                <div className={styles.symbol}>
                    <img src="/Player2Symbol.png" alt="2"/>
                </div>
            );
        default:
            return(
                <div className={styles.symbol}>
                </div>
            )
    }
}

export default Symbol;