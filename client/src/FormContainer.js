import styled from "styled-components"

function FormContainer ({form}) {

    return (
        <StyledDiv >
            {form}
        </StyledDiv>  
    )
}

export default FormContainer

const StyledDiv = styled.div `
position: fixed;
top: 15%;
left: 25%;
border: solid;
max-height: 70vh;
max-width: 50vw;
background: white;

`