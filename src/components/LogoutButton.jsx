// Importing The Hooks -------------------------------------------------------->
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Importing The Emptystore Action -------------------------------------------->
import { emptyStore } from "../Actions/managementAction";



// Function For LogoutButton --------------------------------------------------->
function LogoutButton(){
// Use Cookie For Geeting The Cookie Value From Browser--/
const[cookie,setCookie,removeCookie]=useCookies(["loginCookie"])  ;
// Use Navigate Function --------------------------------/
const navigate=useNavigate();  
// Use Dispatch Function --------------------------------/
const dispatch=useDispatch();  
// Function For logout Button Click----------------------/
function logOut(){
    removeCookie("loginCookie");
    alert("Logout Successfull");
    navigate("/login");
    dispatch(emptyStore());
}
    return(
        <>
        <button onClick={logOut} id="logoutBtn">Logout</button>
        </>
    )
};

// Exporting The LogoutButton Function ----------------------------------------->
export default LogoutButton;