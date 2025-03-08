import { useContext } from "react"
import { UserContext } from "../../Context/Context"
import { Navigate } from "react-router-dom"

export function Protectedroute(props) {
// let {userLogin , setuserLogin} = useContext(UserContext)
if (localStorage.getItem("Token") != null) {
    return props.children
} else{
  return <Navigate to={"/Login"}/>
}
    

    return <>
    
    
    
    </>
        
    
}


