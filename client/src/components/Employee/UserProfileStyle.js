import styled from 'styled-components'

export const colors = {
    primary: "#fff",
    theme: "#BE185D",
    light1: "#F3F4F6",
    light2: "#E5E7EB",
    dark1: "#1F2937",
    dark2: "#4B5563",
    dark3: "#9CA3AF",
    red: "#DC2626"

}

export const InfoContainer = styled.div`
display: flex;

justify-content: space-between;
align-items: center;
padding: 4%;
flex-wrap: ${(props) => props.isMobile ? 'nowrap' : 'wrap'};
flex-direction: ${(props) => props.isMobile ? 'column' : ''};
margin: 20px 0 12px 0;
`;

export const StyledHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => props.padding}%;
    

`;

export const StyledHeadingTitle = styled.h3`
font-size: ${(props) => props.size}rem;
padding: ${(props) => props.padding}%;
color: ${(props) => props.color ? props.color : colors.dark2};

`;

export const LabelBox = styled.span`
font-weight: 500;
margin-bottom: 5px;
display: block;
`;

export const TextInputContainer = styled.input`
height: ${(props) => props.height};
width: 100%;
outline: none;
border-radius: 5px;
border: 1px solid #ccc;
padding-left: 15px;
font-size: 16px;
background-color: ${colors.light1};
border-bottom-width: 2px;
transition: all 0.3s ease;

&:focus {
    border-color: #BE185D;
    
}
`;

export const SelectInputContainer = styled.select`
height: ${(props) => props.height};
width: 100%;
outline: none;
border-radius: 5px;
border: 1px solid #ccc;
padding-left: 15px;
font-size: 16px;
background-color: ${colors.light1};
border-bottom-width: 2px;
transition: all 0.3s ease;

&:focus {
    border-color: #BE185D;
    
}
`;

export const TextAreaInputContainer = styled.textarea`
height: 70px;
width: 100%;
outline: none;
border-radius: 5px;
border: 1px solid #ccc;
padding-left: 15px;
font-size: 16px;
background-color: ${colors.light1};
border-bottom-width: 2px;
transition: all 0.3s ease;
resize: none;
font-family: 'Roboto', sans-serif;

&:focus {
    border-color: #BE185D;
    
}
`; 

export const FieldContainer = styled.div`
margin-bottom: 15px;
width: calc(100% / 2 - 20px);
`;

export const RadioInputContainer = styled.div`
height: 45px;
width: 100%;
display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 2%;
border-radius: 5px;
border: 1px solid #ccc;
padding-left: 15px;
font-size: 16px;
background-color: ${colors.light1} ;
border-bottom-width: 2px;
transition: all 0.3s ease;

&:focus {
    border-color: #BE185D;
    
}
`;

export const RadioLabel = styled.label`
    width: 100%;
`;