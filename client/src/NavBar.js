import { NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components'

function NavBar({ user , setUser , handleFormContainer , handleLogout}){
    
   
   

    //   switching to profile from other user doesnt chagne
    return <NavDiv>
        <StyledNav id="NavBar">
           { !user ? <NavLink to="/">Home</NavLink> : <></>}
            
            <NavLink to="/library">Library</NavLink>
            <NavLink to="/readers">Readers</NavLink>
            <NavLink to="/chatrooms">Chatrooms</NavLink>
            {user ? <>
                <NavLink to="/librarysearch">Search</NavLink>
                <NavLink to={`/readers/${user.id}`}>Profile</NavLink>
                <button onClick={handleLogout}>Logout</button>
            </> : <>
            <button onClick={() => handleFormContainer('login')}>Login</button>
            <button onClick={() => handleFormContainer('signup')}>Sign up</button>
            
            </>}
        </StyledNav>
        
    </NavDiv>
}

export default NavBar
const NavDiv = styled.div`
    margin-top: 4vh;
    width: 90%;
    height: 10vh;
`
const StyledNav = styled.nav`
*{
    color:black;
    background: none;
    border: none;

    margin-left: 25px;
    cursor: pointer;
    text-decoration: none;
    font-size: calc(6px + 1vw);
}
.active{
    border: solid;
    border-radius: 15px;
    padding: 10px;
    font-size: calc(12px + 1vw);

}
`