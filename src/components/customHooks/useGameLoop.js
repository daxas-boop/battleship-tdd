import {useState, useEffect} from 'react';
import newGameboard from '../../factories/Gameboard';
import humanPlayer from '../../factories/Player';
import AIPlayer from '../../factories/AI';


const useGameLoop = () => {
    const [winner, setWinner] = useState();
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
        setWinner();
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

    const AIPlay = () => {
        setTimeout(() => {
            const randomCoords = players.AI.randomAttack();
            const enemyGameboard = players.human.getGameboard();
            enemyGameboard.receiveAttack(randomCoords[0], randomCoords[1]);
            checkWinner();
            if(enemyGameboard.getBoard()[randomCoords[0]][randomCoords[1]] === 'sunked ship'){
                setPlayers(prevState => ({...prevState}))
                setTimeout(() => {AIPlay()}, 300);
                return;
            }
            changePlayersTurn();
        }, 300);
    }

    const cellOnClick = (e) => {
        if(e.target.dataset.player === players.human.getName()){
            console.error('Click on the enemy gameboard')
            return;
        }
        const enemyGameboard = players.AI.getGameboard();
        const column = Number(e.target.dataset.cord1);
        const row = Number(e.target.dataset.cord2);
        enemyGameboard.receiveAttack(column, row);
        checkWinner();
        if(enemyGameboard.getBoard()[column][row] === 'sunked ship'){
            setPlayers(prevState => ({...prevState}))
            return;
        }
        changePlayersTurn();
        AIPlay();
    }

    return {cellOnClick, players, winner, startNewGame, remainingShips}
}

export default useGameLoop;
