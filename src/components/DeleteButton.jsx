// Importing The Actions ------------------------------------------------------------------------>
import { deleteItem,emptyStore }  from "../Actions/managementAction";
// Importing The UseCookies --------------------------------------------------------------------->
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



// Function For DeleteButton ---------------------------------------------------------------------------------------------------->
function DeleteButton(props){
// Using useCookie ------------------------------------------------------------------------------->
const [cookie,setCookie,removeCookie]=useCookies(["loginCookie"]);
//Using UseNavigate ------------------------------------------------------------------------------>
const navigate=useNavigate();
//Using UseDispatch ------------------------------------------------------------------------------>
const dispatch=useDispatch();
// Function For Deleting The User----------------------------------------------------------------->
async function deleteFunction(itemId){
    const id=JSON.stringify({itemId:itemId});
    
    const response =await fetch("/usermanagementsystem/api/v1/users/deleteitems",{
        method:"DELETE",
        headers:{
         "Content-type":"Application/json",
         "access-token":cookie.loginCookie
        },
        body:id
    });
    const responseData=await response.json();
    if(responseData.success===true){
        
        alert(responseData.msg);
        console.log('hi');
       dispatch(deleteItem(itemId));
    }else if(responseData.status===401){
        removeCookie("loginCookie");
        dispatch(emptyStore());
        navigate("/login");
      
    }else if(responseData.success===false){
        alert(responseData.msg)
    }
}    
    return(
        <>
         <i onClick={()=>deleteFunction(props.id)} className="fa-solid fa-trash"  >
                    
                    </i>
        </>
    )
};


// Exporting The DeleteButton -------------------------------------------------------------------->
export default DeleteButton;