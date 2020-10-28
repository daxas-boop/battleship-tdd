import {useState,useEffect} from 'react';
import GamboardFactory from '../../factories/Gameboard';
import humanPlayer from '../../factories/Player';
import AIPlayer from '../../factories/AI';


const useGameLoop = (startGame) => {
    const [gameStatus, setGameStatus] = useState();
    const [playerTurn, setPlayerTurn] = useState();
    const [winner, setWinner] = useState();
    const [players, setPlayers] = useState(
        {
            human: humanPlayer('pepe', GamboardFactory()),
            AI: AIPlayer(GamboardFactory())
        }
    );
    
    useEffect(() => {
        setGameStatus(startGame ? 'started' : 'not started')
        switch (gameStatus) {
            case 'started':
                players.human.turn ? setPlayerTurn(`${players.human.getName()} turn.`) : setPlayerTurn(`${players.AI.getName()} turn.`);
            break;

            case 'not started':
                setPlayerTurn('Click on START GAME to start the game')
            break;

            case 'ended':
                setPlayerTurn(`${winner} won the game.`)
            break;
        
            default:
                break;
        }
    }, [gameStatus, players, startGame, winner])

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
            setGameStatus('ended');
            console.log('AI WON')
            setWinner(players.AI.getName());
        } else if (players.AI.getGameboard().allShipsSunk()){
            setGameStatus('ended');
            console.log('HUMAN WON')
            setWinner(players.human.getName());
        }
    }

    const AIPlay = () => {
        setTimeout(() => {
            const randomCoords = players.AI.randomAttack();
            const enemyGameboard = players.human.getGameboard();
            enemyGameboard.receiveAttack(randomCoords[0], randomCoords[1]);
            checkWinner()
            changePlayersTurn();
        }, 500);
    }

    const cellOnClick = (e) => {
        if(!startGame) return
        if(e.target.dataset.player === players.human.getName()){
            console.log('Click on the enemy gameboard BITCH!')
            return
        }
        const enemyGameboard = players.AI.getGameboard();
        enemyGameboard.receiveAttack(Number(e.target.dataset.cord1), Number(e.target.dataset.cord2));
        checkWinner()
        changePlayersTurn();
        AIPlay();
    }

    return {cellOnClick, playerTurn, players}
}

export default useGameLoop;