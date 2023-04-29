import { NavLink } from "react-router-dom";
import styled from 'styled-components'

function NavBar({ user , setUser , handleFormContainer}){
    
    function handleLogout(){
        fetch("/logout", {
          method: "DELETE"}).then(() => {
              setUser(undefined)
            })
      }
    return <NavDiv>
        <StyledNav>
            <NavLink to="/">Home</NavLink>
            
            <NavLink to="/library">Library</NavLink>
            <NavLink to="/readers">Readers</NavLink>
            <NavLink to="/chatrooms">Chatrooms</NavLink>
            {user ? <>
                <NavLink to="/librarysearch">Search</NavLink>
                <NavLink to={`/readers/${user.id}`}>Profile</NavLink>
                <button onClick={handleLogout}>Logout</button>
            </> : <>
            <button onClick={() => handleFormContainer('login')}>Login</button>
            <NavLink to="/signup">Sign up</NavLink>
            
            </>}
        </StyledNav>
        
    </NavDiv>
}

export default NavBar
const NavDiv = styled.div`
    width: 100vw;
    height: 10vh;
    font-size: calc(10px + 1vw);
`
const StyledNav = styled.nav`
.active{
    color: red;
}
`