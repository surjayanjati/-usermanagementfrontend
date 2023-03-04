/// Importing The Hooks-------------------------------->
import { useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
/// Importing The Css File----------------------------->
import "../public/css/modal.css";
/// Importing Actions From Action File----------------->
import { editItem,emptyStore } from "../Actions/managementAction";





// Function For Edit Modal ----------------------------------------------------------------------------->
function EditModal(props){
      // Use State Hooks For Storing The Notes Value---------->
  const [initialData, setData] = useState();
  // Using UseNavigate For Storing The Function------------>
  const navigate=useNavigate();
  // Dispatch Function ------------------------------------>
  const dispatch=useDispatch();
  // Using UseState Hooks For Modal
  const [showModal, setShowModal] = useState(false);
  // Using The UseSelector --------------------------------->
  const store=useSelector((state)=>state.managementReducer);
  
  /// Array destrcuring For Storing The Cookies Value
  const [cookies, setCookies, removeCookie] = useCookies(["loginCookie"]);
  // Form Event --------------------------------------->
  function formEvent(e) {
    e.preventDefault();
  }
  // Variables For Geeting The Form Value ------------------>
  let name="";
  let price="";
  let description="";

  // Function For Storing The Value Input Change------------>
  function textEvent(e) {
    if(e.target.name==="name"){
        name=e.target.value;
        
    }else if(e.target.name==="price"){
        price=e.target.value;
    }else if(e.target.name==="description"){
     description=e.target.value
    }
  
  }

// Async Function For Updating The Notes----------------------------------------->
async function updateFunction(itemId){
  console.log(itemId);
       const newObj=({name:name,price:price,description:description,id:itemId.itemId});
       const response=await fetch("/usermanagementsystem/api/v1/users/items",{
        method:"PUT",
        headers:{
            "Content-type":"Application/json",
            "access-token":cookies.loginCookie
        },
        body:JSON.stringify(newObj) 
       });
       const responseData=await response.json();
       
       if(responseData.success===true){
        alert(responseData.msg);
        setShowModal(false);
        dispatch(editItem(newObj))
       }else if(responseData.status===401){
        removeCookie("LoginCookie");
        dispatch(emptyStore());
        navigate("/login");
        
       }else if(responseData.success===false){
        alert(responseData.msg);
       }
}  

  // Function Returning The Modal Component----------->
  const MyModal = (itemId) => {
    return (
      <>
        <div className="wrapper">
          <div className="modalcontainer">
            <div className="modalcontainer-box">
              <h4>UPDATE YOUR NOTE</h4>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setShowModal(false)}
              ></i>
            </div>
            <form onSubmit={formEvent} className="update-form">
              <div className="modalcontainer-box button-box">
                <input
                  type="text"
                  placeholder="Enter New Name"
                  onChange={textEvent}
                  name="name"
                />
                
                 <input
                  type="text"
                  placeholder="Enter New Price"
                  onChange={textEvent}
                  name="price"
                />
                 <input
                  type="text"
                  placeholder="Enter New Description"
                  onChange={textEvent}
                  name="description"
                />
               
              </div>
              <div className="modalcontainer-box button-box">
                <button onClick={()=>updateFunction(itemId)} >Update</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      ></i>
      {showModal && <MyModal itemId={props.id} />}
    </>
  );
};

// Exporting The Edit Modal Function ------------------------------------------------------------->
export default EditModal;