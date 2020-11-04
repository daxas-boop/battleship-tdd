import {useState, useEffect} from 'react';
import newGameboard from '../../factories/Gameboard';
import humanPlayer from '../../factories/Player';
import AIPlayer from '../../factories/AI';


const useGameLoop = () => {
    const [winner, setWinner] = useState(null);
    const [remainingShips, setRemainingShips] = useState();
    const [players, setPlayers] = useState({
        human: humanPlayer(newGameboard()),
        AI: AIPlayer(newGameboard())
    });
    
    useEffect(() => {
        players && setRemainingShips({
            humanShips: players.human.getGameboard().getShipsRemaining(),
            AIShips: players.AI.getGameboard().getShipsRemaining()
        })
    }, [players])

    const startNewGame = () => {
        const newPlayers = {
            human: humanPlayer(newGameboard()),
            AI: AIPlayer(newGameboard())
        }
        setPlayers(newPlayers);
        setWinner(null);
    }

    const changePlayersTurn = () => {
        setPlayers(prevState => ({
            human: {
                ...prevState.human,
                turn: !prevState.human.turn
            },
            AI:{
                ...prevState.AI,
                turn: !prevState.AI.turn
            }
        }))
    }

    const checkWinner = () => {
        if (players.human.getGameboard().allShipsSunk()){
            setWinner(players.AI.getName());
        } else if (players.AI.getGameboard().allShipsSunk()){
            setWinner(players.human.getName());
        }
    }

    const isShipHit = (enemyGameboard, column, row) => {
        const enemyBoard = enemyGameboard.getBoard();
        return (enemyBoard[column][row] === 'sunked ship');
    } 

    const AIPlay = () => {
        setTimeout(() => {
            const randomCoords = players.AI.randomAttack();
            const column = randomCoords[0];
            const row = randomCoords[1];
            const enemyGameboard = players.human.getGameboard();

            enemyGameboard.receiveAttack(column, row);
            if (isShipHit(enemyGameboard,column,row)) {
                setPlayers(prevState => ({...prevState}))
                checkWinner();
                setTimeout(() => {AIPlay()}, 300);
                return;
            }
            changePlayersTurn();
        }, 300);
    }

    const cellOnClick = (column, row) => {
        const enemyGameboard = players.AI.getGameboard();
        enemyGameboard.receiveAttack(column, row);

        if (isShipHit(enemyGameboard,column,row)) {
            setPlayers(prevState => ({...prevState}))
            checkWinner(); 
            return;
        }
        
        changePlayersTurn();
        AIPlay();
    }

    return {cellOnClick, players, winner, startNewGame, remainingShips}
}

export default useGameLoop;
