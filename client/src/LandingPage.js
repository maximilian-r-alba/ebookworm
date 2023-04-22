import { UserContext } from "./UserContext"
import { useContext } from "react"

function LandingPage(){
    const user = useContext(UserContext)
    return <>
    {user ? <h1>Hello {user.name}</h1> : <h1>Hello world</h1>}
    </>
}

export default LandingPage