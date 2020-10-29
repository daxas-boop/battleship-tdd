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
`

const HitShip = styled.div `
    background-color: 
`

const Gameboard = (props) => {
    const {gameboard, cellOnClick} = props;

    return(
        <Container>
            {gameboard.getCoordinates().map(row => 
                <Row key={uniqid()}>
                    {row.map((element, i) => 
                        typeof element === 'object' || element === 0 ? 
                            <Cell 
                            key={uniqid()}
                            data-cord1={gameboard.getCoordinates().indexOf(row)}
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
                        ></HitShip>
                        )
                    }
                </Row>
            )}
        </Container>
    )
}

export default Gameboard;