import React,{useState, useEffect} from 'react';
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
    grid-column:1/3;

    @media(max-width:768px) {
        grid-row:2/3;
        grid-column:1/2;
        margin:2px;
    }
`

const Menu = styled.div `
    margin:45px auto !important;
    display:flex;
    flex-direction:column;
    width:300px;
    position:static;

    @media(max-width:320px) {
        width:250px;
    }
`

const IconLink = styled.a `
    text-align:center;
    margin-top:20px;
`

const HowToPlay = styled.div `
    position:absolute !important;
    width:450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border:4px solid white;
    padding:15px;
    text-align:center;
    max-width:100vw;
    
    @media(max-width:320px) {
        top:55%;
        width:280px;
    }
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
    max-width:100vw;
`

const Title = styled.h4 `
    margin-top:20px;
    text-align:center;
`

const Container = styled.div `
    display:grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr 1fr;
    height: 500px;
    margin-top:20px;

    @media(max-width:768px) {
        grid-template-columns:1fr;
        height: 300px;
        grid-template-rows: 360px 30px 360px;
    }

    @media(max-width:320px) {
        grid-template-columns:1fr;
        height: 300px;
        grid-template-rows: 300px 30px 300px;
    }
`

const Game = () => {
    const {cellOnClick, players, winner, startNewGame, remainingShips} = useGameLoop();
    const [renderMenu, setRenderMenu] = useState(true);
    const [renderGameboards, setRenderGameboards]= useState(false);
    const [renderHowtoPlay, setRenderHowToPlay] = useState(false);
    const [renderWinner, setRenderWinner] = useState(false);

    useEffect(() => {
        winner ? setRenderWinner(true) : setRenderWinner(false);
    }, [winner])

    const handleNewGame = () => {
        startNewGame();
        setRenderMenu(false); 
        setRenderGameboards(true);
    }

    return (
        <>
            {renderMenu && 
                <Menu className='nes-container is-rounded'>
                    <Button 
                        className='nes-btn' 
                        onClick={() => handleNewGame()}>
                        New game
                    </Button>

                    <Button 
                        className='nes-btn' 
                        onClick={() => setRenderHowToPlay(true)}>
                        How to Play
                    </Button>

                    <IconLink href='https://github.com/daxas-boop/' target='_blank' rel="noopener noreferrer">
                        <i className='nes-icon github nes-pointer is-medium'></i>
                    </IconLink>

                    {renderHowtoPlay && 
                        <HowToPlay 
                        data-testid="how-to-play"
                        className="nes-dialog is-dark">
                            <p>Click in a coordinate.</p>
                            <p>If you hit the enemy ship keep playing.</p>
                            <p>Otherwise it's the Computers turn.</p>
                            <p>Whoever destroys all enemy ships first wins.</p>
                                <Button className="nes-btn is-primary" onClick={() => setRenderHowToPlay(false)} >Continue</Button>
                        </HowToPlay>}
                </Menu>
            }

            {renderGameboards &&
                <Container>
                    <StateTurn>{players.human.turn ? 'Your turn' : 'Computer\'s turn.'}</StateTurn>
                    <Gameboards
                        cellOnClick={cellOnClick}
                        humanGameboard={players.human.getGameboard().getBoard()}
                        aiGameboard={players.AI.getGameboard().getBoard()}
                        shipsRemaining={remainingShips}
                    />
                </Container>
            }

            {renderWinner &&
                <WinnerContainer 
                data-testid="winner-container"
                className='nes-dialog is-dark'>
                    <Title>{winner === 'HUMAN' ?  'YOU WON !!' : 'YOU LOST :('}</Title> 
                    <Button 
                        className='nes-btn is-primary' 
                        onClick={()=> startNewGame()}>
                        Play again?
                    </Button>
                    <Dialog />
                </WinnerContainer>
            }
        </>
    )
}

export default Game;