import { UserContext } from "./UserContext"
import { useContext } from "react"
import UserForm from "./UserForm"

function LandingPage({handleUsers}){
    const user = useContext(UserContext)
    
    return <>
    {user ? <h1>Hello {user.name}</h1> : <UserForm handleUsers={handleUsers}/>}
    </>
}

export default LandingPage