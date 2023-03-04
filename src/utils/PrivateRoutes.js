import { useCookies } from "react-cookie";
import { Outlet,Navigate } from "react-router-dom";

const PrivateRoutes=()=>{
    const [cookies,removeCookies,setCookies]=useCookies(['loginCookie']);
    if(cookies.loginCookie!=="" && cookies.loginCookie!==undefined){
         return <Outlet/>
    }else {
    return <Navigate to="/login"/>
    }
   
    
};

export default PrivateRoutes;