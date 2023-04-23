import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { UserContext } from "./UserContext";
function NavBar({setUser}){
    const user = useContext(UserContext)
    const navigate = useNavigate()

    function handleLogout(){
        fetch("/logout", {
          method: "DELETE"}).then(() => {
              navigate('/') 
              setUser(undefined)
            })
      }
    return <div>
        <StyledNav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/librarysearch">Search</NavLink>
            <NavLink to="readers">Readers</NavLink>
            {user ? <button onClick={handleLogout}>Logout</button> : <><NavLink to="/login"> Login </NavLink> <NavLink to="/signup">Sign up</NavLink></>}
        </StyledNav>
        
    </div>
}

export default NavBar

const StyledNav = styled.nav`
.active{
    color: red;
}
`