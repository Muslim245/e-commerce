
import { Navigate } from "react-router-dom"

export function Protectedroute(props) {
if (localStorage.getItem("Token") != null) {
    return props.children
} else{
  return <Navigate to={"/Login"}/>
}
    

    return <>
    
    
    
    </>
        
    
}


