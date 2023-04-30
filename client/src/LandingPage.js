import { UserContext } from "./UserContext"
import { useContext } from "react"
import UserForm from "./UserForm"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

function LandingPage({handleUsers}){
    const user = useContext(UserContext)
    const navigate = useNavigate()
    return <StyledLanding>
    {user ? 
    <>
   {navigate('/library')}
    </>
    
    
    : 
    <div className="formContainer">
        <UserForm handleUsers={handleUsers}/>
    </div>
    }
    </StyledLanding>
}

export default LandingPage

const StyledLanding = styled.div`

width: 100vw;
height: 100vh;
div.formContainer{
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    border: 2px solid;
    border-radius: 20px;
    background-color: white;
}
`