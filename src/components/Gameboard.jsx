import React from 'react'
import uniqid from 'uniqid';
import styled from '@emotion/styled';

const Container = styled.div `
    display:grid;
    grid-row:2/3;
    grid-template-rows: repeat(10, 1fr);
    background-color:black;
    grid-auto-flow: column;
    border:1px solid black;
    margin:10px;
`

const Row = styled.div `
    grid-column: 1/11;
    display:grid;
    grid-template-columns: repeat(10, 1fr);
`

const Cell = styled.div `
    display:flex;
    margin:1px;
    background-color:grey;
    &:hover {
        cursor:pointer;
    }
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

const Gameboard = (props) => {
    const {gameboard, cellOnClick} = props;

    return(
        <Container>
            {gameboard.getBoard().map(row => 
                <Row key={uniqid()}>
                    {row.map((element, i) => 
                        typeof element === 'object' || element === 0 ? 
                            <Cell 
                            key={uniqid()}
                            data-cord1={gameboard.getBoard().indexOf(row)}
                            data-cord2={i}
                            onClick={(e) => cellOnClick(e)}
                            data-player={props.player}
                            >
                            </Cell>
                        : element === 'x' ? 
                        <MissedShot
                            key={uniqid()}
                        ></MissedShot> :
                        <HitShip
                            key={uniqid()}
                        >x</HitShip>
                        )
                    }
                </Row>
            )}
        </Container>
    )
}

export default Gameboard;