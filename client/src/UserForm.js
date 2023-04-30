import { useEffect, useState } from "react"
import styled from "styled-components"
import {AiOutlineCloseSquare} from "react-icons/ai"

function UserForm({ user , popup , setUser , handleUsers , setFormView}){

    useEffect(()=>{
        if(user){
            setUserParams({name: user.name, username:user.username, headline: user.headline, profile_picture: user.profile_picture})
        }
    },[])

    const [userParams, setUserParams] = useState({name:"", username:"", password:"", password_confirmation:"", headline:"", profile_picture:""})
    const [errors, setErrors] = useState()
   

    function handleChange(e){
        const key = e.target.id
        const value = e.target.value

        setUserParams({...userParams, [key]:value})
    }

    function handleSubmit(e){
        e.preventDefault()
        if(user){
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(userParams)
            }).then( r => {
                if(r.ok){
                  
                    r.json().then( u => {
                        setUser(u)
                        setFormView(false)
                    })
                }
                else{
                    r.json().then(d => setErrors(d.errors))
                }
            })
        }
        else{
            fetch('/users', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(userParams)
        }).then( r => {
            if(r.ok){
                r.json().then( u => {
                    handleUsers(u)
                    setFormView(false)
                })
            }
            else{
                r.json().then(d => setErrors(d.errors))
            }
        })
    }
        
    }

    return <FormContainer>
    {errors ? <ErrorDiv>{errors.map((error) => <p>{error}</p>)}</ErrorDiv> : <></>}
  
    <StyledForm onSubmit={handleSubmit}>
    
    { user || popup ? <AiOutlineCloseSquare size={'5%'} onClick={() => setFormView(false)}/> : <></>}
    {user ? <></> : <h1>Sign up</h1>}
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
       { user ? <input type="submit" value={'Edit'}/> : <input type="submit" value={'Sign Up'}/>}
    </StyledForm>
    </FormContainer>
    
}

export default UserForm

const StyledForm = styled.form`
 margin: 2vw;
display: flex;
flex-direction: column;
/* gap: 5px; */
label{
    font-size: calc(6px + .5vw);
    margin-top: 15px;
    margin-bottom: 10px;
}

input{
    font-size: calc(12px + .5vw);
    border: none;
    border-bottom: 1px solid;
}
input:focus {
    outline: none;
    box-shadow: 0px 0px 5px #61C5FA;
    border:1px solid #5AB0DB;
}
input[type="text"]:focus:hover {
    outline: none;
    box-shadow: 0px 0px 5px #61C5FA;
    border:1px solid #5AB0DB;
    border-radius:0;
}

input[type="submit"]{
    width: 50%;
    margin-top: 15px;
    align-self: center;
    border: 2px solid;
    border-radius: 10px;
}

svg{
    color: red;
    align-self: end;
    cursor: pointer;
}

min-width: 30vw;
min-height: 20vw;
`

const ErrorDiv = styled.div`
font-size: calc(10px + .75vw);
padding: 20px;
max-width: 20vw;
align-self: center;
/* position: absolute;
top: 10vh;
left: 5vw; */
`

const FormContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
`