import React from 'react'
import uniqid from 'uniqid';
import styled from '@emotion/styled';

const Container = styled.div `
    display:grid;
    grid-template-rows: repeat(10, 1fr);
    grid-auto-flow: column;
    border:1px solid black;
    margin:2px;
`

const Row = styled.div `
    grid-column: 1/11;
    display:grid;
    grid-template-columns: repeat(10, 1fr);
    border:1px solid black;
`

const Cell = styled.div `
    display:flex;
    border:1px solid black;
    background-color:grey;
`

const Gameboard = (props) => {
    const {gameboard} = props;

    return(
        <Container>
            {gameboard.getCoordinates().map(row => 
                <Row key={uniqid()}>
                    {row.map(element => 
                        <Cell key={uniqid()}>
                            
                        </Cell>)}
                </Row>
            )}
        </Container>
    )
}

export default Gameboard;