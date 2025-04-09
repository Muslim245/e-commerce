import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()
export function UserContextProvider(props) {

    let [userLogin, setuserLogin] = useState(localStorage.getItem("Token"))
    return <UserContext.Provider value={{userLogin ,  setuserLogin }}>

        {props.children}
    </UserContext.Provider>
    
}
