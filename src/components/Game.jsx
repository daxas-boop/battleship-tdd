import React,{useState, useEffect} from 'react';
import Gameboard from './Gameboard';
import GamboardFactory from '../factories/Gameboard';
import humanPlayer from '../factories/Player';
import AIPlayer from '../factories/AI';
import styled from '@emotion/styled';

const Container = styled.section `
    margin-top: 100px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    height: 500px;
`

const Game = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        setPlayers(
            {
            human: humanPlayer('pepe', GamboardFactory()),
            AI: AIPlayer(GamboardFactory())
            }
        )
    }, [])

    return (
        <Container>
            {Object.entries(players).map(([key,value]) => 
                <Gameboard 
                    key={key}
                    gameboard = {value.getGameboard()}
                ></Gameboard>
            )}
        </Container>
    )
}

export default Game;