import React from 'react'
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledContainer } from '../components/Styles'
import useViewport from "../viewport/useViewport";


//logo
import logo from "./../assets/logo.png";

export default function Home() {

    const { isMobile, isTablet } = useViewport();

  return (
    <StyledContainer style={{justifyContent: 'center', alignItems: 'center'}}>

    <div >
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: "transparent",
            width: '100%',
            padding: '15px',
            display: 'flex',
            justifyContent: 'flex-start'
        }}>
            <Avatar image={logo}/>
        </div>
        <StyledTitle size={65}>
            Welcome to Efficacy Tracker
        </StyledTitle>
        <StyledSubTitle size={27}>
            Feel free to explore our page
        </StyledSubTitle>

        <ButtonGroup style={{
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : '',
            }}>

        <StyledButton to='/login'>Login</StyledButton>
        <StyledButton to='/signup' style={{marginTop: isMobile ? '5%' : ''}}>Signup</StyledButton>
        </ButtonGroup>
    </div>
    </StyledContainer>
  )
}
