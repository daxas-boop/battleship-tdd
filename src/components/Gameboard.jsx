import React,{useState, useEffect} from 'react'
import uniqid from 'uniqid';
import styled from '@emotion/styled';
import "nes.css/css/nes.min.css";

const Container = styled.div `
    display:grid;
    grid-template-columns: 1fr 1fr;
    height: 500px;
    margin-top:20px;
`
const Board = styled.div `
    display:grid;
    grid-template-rows: repeat(11, 1fr);
    grid-template-columns: repeat(11, 1fr);
    grid-auto-flow: column;
    width:500px;
    height:500px;
    margin:0 auto;
`

const Wrapper = styled.section `
    border: 4px solid black;
    margin:10px;
`

const Row = styled.div `
    grid-column: 1/12;
    display:grid;
    grid-template-columns: repeat(11, 1fr);
`

const Cell = styled.div `
    display:flex;
    margin:1px;
    background-color:grey;
`

const MissedShot = styled.div `
    background-color: teal;
    margin:1px;
`

const HitShip = styled.div `
    background-color: red;
    margin:1px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:'Roboto';
`

const Ship = styled.div `
    margin:1px;
    background-color:blue;
`

const Title = styled.h3 `
    text-align:center;
    margin-top:20px;
    margin-bottom:20px;
`

const Coordinates = styled.div `
    background-color:white;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Lives = styled.p `
    margin-top:10px;
    text-align:center;
`

const Gameboards = (props) => {
    const {humanGameboard, AIGameboard, cellOnClick, shipsRemaining} = props;
    const [humanLives, setHumanLives] = useState(Array(shipsRemaining.humanShips).fill(1));
    const [AILives, setAILives] = useState(Array(shipsRemaining.AIShips).fill(1));

    useEffect(() => {
        const STARTING_LIVES = 5;

        const newAILives = AILives;
        const AIlostLives =  STARTING_LIVES - shipsRemaining.AIShips;
        if(AIlostLives) {
            for(let i=0; i<AIlostLives;i++){
                newAILives.splice(STARTING_LIVES-AIlostLives,1,0)
            }
        }
        setAILives(newAILives);

        const newHumanLives = humanLives;
        const humanLostLives =  STARTING_LIVES - shipsRemaining.humanShips;
        if(humanLostLives) {
            for(let i=0; i<humanLostLives;i++){
                newHumanLives.splice(STARTING_LIVES - humanLostLives,1,0)
            }
        }
        setHumanLives(newHumanLives);
    }, [AILives, shipsRemaining, humanLives])

    return(
        <Container>
            <Wrapper>
                <Title>Your board</Title>
                <Board>
                    {humanGameboard.getBoard().map((row,i)=>
                    <React.Fragment key={uniqid()}>
                        <Row key={uniqid()}>
                            {row.map((element, i) => 
                                typeof element === 'object' ?
                                <Ship key={uniqid()}> </Ship> 
                                : element === 0 ?
                                    <Cell key={uniqid()} />
                                : element === 'x' ? 
                                    <MissedShot key={uniqid()} /> 
                                : element === 'sunked ship' &&
                                    <HitShip key={uniqid()} />
                                )
                            }
                            <Coordinates key={uniqid()}>{i}</Coordinates>
                        </Row>
                            <Coordinates key={uniqid()}>{i}</Coordinates>
                    </React.Fragment>
                    )}
                </Board>
                <Lives>Your ships alive: {shipsRemaining.humanShips}</Lives>
                <section className="icon-list" style={{display:'flex', justifyContent:'center'}}>
                    {humanLives.map(e => 
                        e === 1 ? 
                        <i key={uniqid()} className="nes-icon is-large heart"></i> 
                        : e === 0 &&
                        <i key={uniqid()} className="nes-icon is-large heart is-empty"></i>
                    )}
                </section>
            </Wrapper>    

            <Wrapper>
                <Title>Enemy board</Title>
                <Board>
                    {AIGameboard.getBoard().map((row,i) => 
                    <React.Fragment key={uniqid()}>
                        <Row key={uniqid()}>
                            {row.map((cell, i) => 
                                typeof cell === 'object' || cell === 0 ? 
                                    <Cell
                                    className='nes-pointer'
                                    key={uniqid()}
                                    data-cord1={AIGameboard.getBoard().indexOf(row)}
                                    data-cord2={i}
                                    onClick={(e) => cellOnClick(e)}
                                    data-player={props.player} 
                                    />
                                : cell === 'x' ? 
                                    <MissedShot key={uniqid()} /> 
                                : cell === 'sunked ship' &&
                                    <HitShip key={uniqid()} />
                            )}
                            <Coordinates key={uniqid()}>{i}</Coordinates>
                        </Row>
                        <Coordinates key={uniqid()}>{i}</Coordinates>
                    </React.Fragment>
                    )}
                </Board>
                <Lives>Enemy ships alive: {shipsRemaining.AIShips}</Lives>
                <section className="icon-list" style={{display:'flex', justifyContent:'center'}}> 
                    {AILives.map(e => 
                        e === 1 ? 
                        <i key={uniqid()} className="nes-icon is-large heart"></i> 
                        : e === 0 &&
                        <i key={uniqid()} className="nes-icon is-large heart is-empty"></i>
                    )}
                </section>
            </Wrapper>

        </Container>
    )
}

export default Gameboards;