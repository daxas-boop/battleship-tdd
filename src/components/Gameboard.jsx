import React from 'react';
import uniqid from 'uniqid';
import styled from '@emotion/styled';
import "nes.css/css/nes.min.css";

const Board = styled.div `
    display:grid;
    grid-template-rows: repeat(11, 1fr);
    grid-template-columns: repeat(11, 1fr);
    grid-auto-flow: column;
    width:500px;
    height:500px;
    margin:0 auto;
    line-height:0;

    @media(max-width:1366px) {
        width:400px;
        height:400px;
    }

    @media(max-width:1024px) {
        width: 300px;
        height: 300px;
    }

    @media(max-width:768px) {
        width: 250px;
        height: 250px;
    }

    @media(max-width:320px) {
        width: 200px;
        height: 200px;
    }
`

const Wrapper = styled.section `
    border: 4px solid #002c66;
    margin:10px;

    @media(max-width:1366px) {
        margin:10px 20px; 
    }

    @media(max-width:1024px) {
        margin:0;
    }

    @media(max-width:768px) {
        margin:0;
    }

    @media(max-width:320px) {
        margin:0;
    }
`

const Row = styled.div `
    grid-column: 1/12;
    display:grid;
    grid-template-columns: repeat(11, 1fr);
`

const Cell = styled.div `
    display:flex;
    border:1px solid #002c66;
    background-color: #2389da;
    &:hover{
        background-color: purple;
    }
`

const CellNoHover = styled.div `
    display:flex;
    border:1px solid #002c66;
    background-color: #2389da;
`

const MissedShot = styled.div `
    background-color: #2389da;
    border:1px solid #002c66;
    display:flex;
    align-items:center;
    justify-content:center;

    @media(max-width:768px) {
        font-size: 14px;
    }
`

const HitShip = styled.div `
    background-color: red;
    border:1px solid #002c66;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:'Roboto';
`

const Ship = styled.div `
    border:1px solid #002c66;
    background-color:blue;
`

const Title = styled.h3 `
    text-align:center;
    margin-top:20px;
    margin-bottom:20px;

    @media(max-width:768px) {
        font-size: 14px;
        margin:4px 0;
    }
`

const Coordinates = styled.div `
    background-color:#eee;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Lives = styled.p `
    margin-top:10px;
    text-align:center;

    @media(max-width:768px) {
        font-size:14px;
        margin:25px 0;
    }
`


const Gameboards = (props) => {
    const {humanGameboard, AIGameboard, cellOnClick, shipsRemaining} = props;

    return(
        <>
            <Wrapper>
                <Title style={{color:'green'}}>Your board</Title>
                <Board>
                    {humanGameboard.getBoard().map((row,i)=>
                    <React.Fragment key={uniqid()}>
                        <Row key={uniqid()}>
                            {row.map((element, i) => 
                                typeof element === 'object' ?
                                <Ship key={uniqid()}> </Ship> 
                                : element === 0 ?
                                    <CellNoHover key={uniqid()} />
                                : element === 'x' ? 
                                    <MissedShot key={uniqid()}>×</MissedShot>
                                : element === 'sunked ship' &&
                                    <HitShip key={uniqid()} >!</HitShip>
                                )
                            }
                            <Coordinates key={uniqid()}>{String.fromCharCode(65+i)}</Coordinates>
                        </Row>
                            <Coordinates key={uniqid()}>{i}</Coordinates>
                    </React.Fragment>
                    )}
                </Board>
                <Lives>Your ships alive: {shipsRemaining.humanShips}</Lives>
            </Wrapper>    

            <Wrapper>
                <Title style={{color:'red'}}>Enemy board</Title>
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
                                    <MissedShot key={uniqid()}>×</MissedShot> 
                                : cell === 'sunked ship' &&
                                    <HitShip key={uniqid()} >!</HitShip>
                            )}
                            <Coordinates key={uniqid()}>{String.fromCharCode(65+i)}</Coordinates>
                        </Row>
                        <Coordinates key={uniqid()}>{i}</Coordinates>
                    </React.Fragment>
                    )}
                </Board>
                <Lives>Enemy ships alive: {shipsRemaining.AIShips}</Lives>
            </Wrapper>
        </>
    )
}

export default Gameboards;
