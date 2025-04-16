import { jwtDecode } from "jwt-decode";
import { createContext , useState } from "react";

export let UserContext = createContext()
export function UserContextProvider(props) {
//    let {id} = jwtDecode(localStorage.getItem("Token"))
//    let [userId , setuserId] = useState(0)
    return <UserContext.Provider value={{}}>

        {props.children}
    </UserContext.Provider>
    
}
