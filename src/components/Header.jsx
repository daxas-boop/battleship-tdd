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
`

const SocialNav = styled.nav `
    margin-top:5px;
    margin-right:5px;
    display:flex;
    flex-direction: column;
`

const IconLink = styled.a `
    text-align:center;
`

const Text = styled.p `
    margin:0;
`

const Header = () => {
    return (
        <Container className='container'>
            <Title>Battleship TDD</Title>
            <SocialNav>
                <Text>Follow me</Text>
                <IconLink href='https://github.com/daxas-boop/' target='_blank' rel="noopener noreferrer">
                    <i className='nes-icon github nes-pointer'></i>
                </IconLink>
            </SocialNav>
        </Container>
    )
}

export default Header;