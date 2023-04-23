import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login({setUser}){

    const [loginCreds, setLoginCreds] = useState({username: "", password: ""})
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setLoginCreds({...loginCreds, [key]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(loginCreds)
        }).then( r => {
            if(r.ok){
                r.json().then( u => setUser(u))
                navigate('/')
            }
            else{
                r.json().then(data => setErrors(data.errors))
            }
        })
    }

    return <>
    {errors ? errors.map(e => <p>{e}</p>) : <></>}
    <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={loginCreds['username']} onChange={handleChange}/>
        <input type="password" name="password" value={loginCreds['password']} onChange={handleChange}/>
        <input type="submit" />
    </form>
    
    </>
}

export default Login