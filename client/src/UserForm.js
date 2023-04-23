import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
function UserForm({handleUsers}){
    const [userParams, setUserParams] = useState({name:"", username:"", password:"", password_confirmation:"", headline:"", profile_picture:""})
    const [errors, setErrors] = useState()
    const navigate = useNavigate()

    function handleChange(e){
        const key = e.target.id
        const value = e.target.value

        setUserParams({...userParams, [key]:value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/users', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(userParams)
        }).then( r => {
            if(r.ok){
                r.json().then( u => {
                    handleUsers(u)
                    navigate('/login')
                })
            }
            else{
                r.json().then(d => setErrors(d.errors))
            }
        })
        
    }
    return <FormContainer>
    {errors ? <ErrorDiv>{errors.map((error) => <p>{error}</p>)}</ErrorDiv> : <></>}
    <StyledForm onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <label htmlFor="name">
            Name:
        </label>
        <input type="text" id="name" onChange={handleChange} value={userParams['name']}/>

        <label htmlFor="username">
            Username:
        </label>
        <input type="text" id="username" onChange={handleChange} value={userParams['username']}/>

        <label htmlFor="password">
            Password:
        </label>
        <input type="password" id="password" onChange={handleChange} value={userParams['password']}/>

        <label htmlFor="password_confirmation">
            Confirm Password:
        </label>
        <input type="password" id="password_confirmation" onChange={handleChange} value={userParams['password_confirmation']}/>

        <label htmlFor="headline">
            Greeting:  
        </label>
        <input type="text" id="headline" onChange={handleChange} value={userParams['headline']}/>

        <label htmlFor="profile_picture">
            Profile Picture: 
        </label>
        <input type="text" id="profile_picture" onChange={handleChange} value={userParams['profile_picture']}/>
        <input type="submit"/>
    </StyledForm>
    </FormContainer>
    
}

export default UserForm

const StyledForm = styled.form`
border: solid;
margin: 2vw;
margin-top: 4vh;
display: flex;
flex-direction: column;
align-items: center;
font-size: calc(10px + 1vw);
`

const ErrorDiv = styled.div`
border: solid;
font-size: calc(10px + .75vw);
max-width: 20vw;
position: absolute;
top: 10vh;
left: 5vw;
`

const FormContainer = styled.div`
position: relative;
`