import React from "react";
import { Navigate } from "react-router";
//import {useAuth} from "../context/GlobalState"

function PrivateRouter({children}) {
    //const {currentUser} = useAuth();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id_admin_current");
    // console.log(currentUser);
    if(!token || !id ) {
        return <Navigate to="/login" />;
    }
    return children
}

export default PrivateRouter;