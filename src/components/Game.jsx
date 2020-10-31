import React,{useState} from 'react';
import Gameboards from './Gameboard';
import styled from '@emotion/styled';
import useGameLoop from './customHooks/useGameLoop';
import Dialog from './Dialog';
import "nes.css/css/nes.min.css";

const Button = styled.button `
    display:flex;
    margin:20px auto;
`

const StateTurn = styled.h3 `
    text-align:center;
    margin-top:20px;
`

const MenuPage = styled.div `
    margin:45px auto !important;
    display:flex;
    flex-direction:column;
    width:300px;
    position:static;
`

const IconLink = styled.a `
    text-align:center;
    margin-top:20px;
`

const HowToPlay = styled.div `
    position:absolute !important;
    width:450px;
    margin: 0 auto !important;
`

const WinnerContainer = styled.div `
    position:absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height:400px;
    width:500px;
    border:4px solid white;
    padding:2px;
`

const Title = styled.h4 `
    margin-top:20px;
    text-align:center;
`

const Game = () => {
    const [startGame, setStartGame] = useState(false);
    const [howtoPlay, setHowToPlay] = useState(false);
    const {cellOnClick, playerTurn, players, winner, startNewGame, remainingShips} = useGameLoop(startGame);

    return (
        <>
            {startGame ?
                <>
                    <StateTurn>{playerTurn}</StateTurn>
                    <Gameboards
                        cellOnClick={cellOnClick}
                        humanGameboard={players.human.getGameboard()}
                        AIGameboard={players.AI.getGameboard()}
                        shipsRemaining={remainingShips}
                    />
                </>
                :
                <MenuPage className='nes-container is-rounded'>
                    <Button className='nes-btn' onClick={() => setStartGame(true)}>
                        New game
                    </Button>

                    <Button className='nes-btn' onClick={() => setHowToPlay(true)}>
                        How to Play
                    </Button>

                    <IconLink href='https://github.com/daxas-boop/' target='_blank' rel="noopener noreferrer">
                        <i className='nes-icon github nes-pointer is-medium'></i>
                    </IconLink>

                    {howtoPlay && 
                    <HowToPlay className="nes-container with-title is-centered is-dark">
                        <p className="title">How to Play</p>
                        <p>Click in a coordinate.</p>
                        <p>If you hit the enemy ship keep playing.</p>
                        <p>Otherwise it's the Computers turn.</p>
                        <p>Whoever destroys all enemy ships first wins.</p>
                            <Button className="nes-btn is-primary" onClick={() => setHowToPlay(false)} >Continue</Button>
                    </HowToPlay>}

                </MenuPage> 
            }
            { winner === 'HUMAN' ? 
                <WinnerContainer className='nes-dialog is-dark'>
                    <Title>YOU WON</Title> 
                    <Button 
                    className='nes-btn is-primary' 
                    onClick={()=> startNewGame()}
                    >Play again?</Button>
                    <Dialog />
                </WinnerContainer>
            : winner === 'AI' && 
                <WinnerContainer className='nes-dialog is-dark'>
                    <Title>YOU LOST</Title>
                    <Button 
                    className='nes-btn is-primary' 
                    onClick={()=> startNewGame()}>
                    Play again?</Button>
                    <Dialog />
                </WinnerContainer>
            }
        </>
    )
}

export default Game;