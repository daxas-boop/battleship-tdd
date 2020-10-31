import React from 'react';
import styled from '@emotion/styled';

const DialogContainer = styled.section `
    display:flex;
    margin:20px;
`

const IconLink = styled.a `
    text-align:center;
    margin-top:20px;
`

const Dialog = () => {
    return(
            <DialogContainer class="message -left">
                <i class="nes-bcrikko" style={{alignSelf: 'flex-end'}}></i>
                <section class="nes-balloon from-left is-dark" style={{width:'75%', marginLeft:30}} >
                    <p>This game was created by daxas-boop.</p>
                    <IconLink href='https://github.com/daxas-boop/' target='_blank' rel="noopener noreferrer">
                        <i className='nes-icon github nes-pointer is-medium'></i>
                    </IconLink>
                </section>
            </DialogContainer>
    )
}

export default Dialog;