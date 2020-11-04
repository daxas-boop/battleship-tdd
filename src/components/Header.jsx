import React from 'react'
import styled from '@emotion/styled';

const Container = styled.header `
    height:75px;
    display:flex;
    align-items:center;
    border-bottom: 4px solid #D3D3D3;
`

const Title = styled.h1 `
    margin-top:10px;  
    color: black;
    flex-grow:2;
    text-align:center;

    @media(max-width:768px) {
        font-size:18px;
    }

    @media(max-width:320px) {
        font-size:14px;
    }
`

const Header = () => {
    return (
        <Container className='container'>
            <Title>Battleship TDD</Title>
        </Container>
    )
}

export default Header;