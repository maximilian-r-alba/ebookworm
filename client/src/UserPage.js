import { useParams } from "react-router-dom"

function UserPage({users}){

    const {id} = useParams()
    const user = users.filter((user) => user.id == id).pop()
    

    return <div>
        <h1>{user.name}</h1>

    </div>
}

export default UserPage