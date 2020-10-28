import React,{useState} from 'react';
import Gameboard from './Gameboard';
import styled from '@emotion/styled';
import useGameLoop from './customHooks/useGameLoop';
import uniqid from 'uniqid';

const Container = styled.section `
    margin-top: 100px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    height: 500px;
`

const Player = styled.h2 `
    text-align:center;
`

const StartGameBtn = styled.button `

`

const StateTurn = styled.h3 `

`

const GameContainer = styled.div `
    display:grid;
    grid-template-rows:1fr 5fr;
`

const Game = () => {
    const [startGame, setStartGame] = useState(false);
    const {cellOnClick, playerTurn, players} = useGameLoop(startGame);

    return (
        <>
            <StartGameBtn
            onClick={ () => setStartGame(true)}
            >STAR GAME</StartGameBtn>
            <StateTurn>{playerTurn}</StateTurn>
            <Container>
                {Object.entries(players).map(([key,player]) =>
                    <GameContainer key={uniqid()}>
                        <Player key={uniqid()}>{player.getName()}</Player>
                        <Gameboard
                            player={player.getName()}
                            cellOnClick= {cellOnClick}
                            key={uniqid()}
                            gameboard = {player.getGameboard()}
                        ></Gameboard>
                    </GameContainer>
                )}
            </Container>
        </>
    )
}

export default Game;