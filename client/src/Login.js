import { useState } from "react"
import styled from "styled-components"

function Login({setUser , setFormView}){
    
    const [loginCreds, setLoginCreds] = useState({username: "", password: ""})
    const [errors, setErrors] = useState([])

    function handleChange(e){
        const key = e.target.id
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
                setFormView(false)
            }
            else{
                r.json().then(data => setErrors(data.errors))
            }
        })
    }

    return <div>
    
    <button onClick={()=> setFormView(false)}>X</button>
    {errors ? errors.map(e => <p>{e}</p>) : <></>}
    <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="username" >
            Username:
        </label>
        <input type="text" id="username" value={loginCreds['username']} onChange={handleChange}/>

        <label htmlFor="password">
            Password:
        </label>

        <input type="password" id="password" value={loginCreds['password']} onChange={handleChange}/>
        <input type="submit" />
    </StyledForm>
    
    </div>
}

export default Login

// possibly style div to move button and error message
const StyledForm = styled.form`

display: flex;
flex-direction: column;
align-items: center;
font-size: calc(10px + 1vw);
gap: 2vw;
min-height: 30vw;
width: 50vw;
`