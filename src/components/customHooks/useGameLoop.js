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
            human: humanPlayer('Human', GamboardFactory()),
            AI: AIPlayer(GamboardFactory())
        }
    );
    
    useEffect(() => {
        setGameStatus(startGame && winner ? 'ended' : startGame ? 'started' : 'not started');
        switch (gameStatus) {
            case 'started':
                players.human.turn ? setPlayerTurn(`${players.human.getName()} turn.`) 
                : setPlayerTurn(`${players.AI.getName()} turn.`);
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
            setWinner(players.AI.getName());
        } else if (players.AI.getGameboard().allShipsSunk()){
            setGameStatus('ended');
            setWinner(players.human.getName());
        }
    }

    const AIPlay = () => {
        if(gameStatus === 'not started' || gameStatus === 'ended') return
        setTimeout(() => {
            const randomCoords = players.AI.randomAttack();
            const enemyGameboard = players.human.getGameboard();
            enemyGameboard.receiveAttack(randomCoords[0], randomCoords[1]);
            checkWinner();
            if(enemyGameboard.getBoard()[randomCoords[0]][randomCoords[1]] === 'sunked ship'){
                setPlayers(prevState => ({...prevState}))
                setTimeout(() => {AIPlay()},300);
                return;
            }
            changePlayersTurn();
        }, 300);
    }

    const cellOnClick = (e) => {
        if(gameStatus === 'not started' || gameStatus === 'ended') return
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

    return {cellOnClick, playerTurn, players}
}

export default useGameLoop;
