import React from 'react'
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledContainer } from '../components/Styles'
import useViewport from "../viewport/useViewport";


//logo
import logo from "./../assets/logo.png";

export default function PasswordResetDone() {

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
            Password Reset Done
        </StyledTitle>
        <StyledSubTitle size={27}>
            Go to Home page and login with the new password!
        </StyledSubTitle>

        <ButtonGroup style={{
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : '',
            }}>

        <StyledButton to='/'>Home Page</StyledButton>
        </ButtonGroup>
    </div>
    </StyledContainer>
  )
}
