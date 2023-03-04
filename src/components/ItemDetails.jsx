/// Importing The Css --------------------------------------------------------------------------------->
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../public/css/notes.css";

/// Function For The CurdBox--------------------------------------------------------------------------->
function ItemDetails() {
const [initialFormValue,setFormValue]=useState({
  item:"",
  price:"",
  description:""
});
const [cookies,setCookie,removeCookie]=useCookies(["loginCookie"]);
const navigate=useNavigate();
// Function For InputEvent_____________________________/
function inputEvent(e){
    const {name,value}=e.target;
    setFormValue((preValue)=>{
      return {
        ...preValue,
        [name]:value
      }
    })
}  
/// Function For Additem Request ______________________/
async function addItem(){
  const itemId=Math.floor((Math.random()*100)*Date.now());
  const data=JSON.stringify({itemId:itemId,name:initialFormValue.item,price:initialFormValue.price,description:initialFormValue.description});
  const response=await fetch("/usermanagementsystem/api/v1/users/additems",{
     method:"POST",
     headers:{
      "Content-type":"Application/json",
       "access-token":cookies.loginCookie
     },
     body:data,
  });
  const responseData=await response.json();
  if(responseData.success===true){
    alert(responseData.msg);
  }else if(responseData.status===401){
    navigate("/login");
  }else if(responseData.success===false){
    alert(responseData.msg);
  }
}
  return (
    <>
      <div className="whole-containeri">
        <div className="main-boxi">
          <div id="box1i">
            <div className="box1-firstboxi">
             
              <h2>Item-Details</h2>
            </div>
            <div className="box1-firstboxi">
              <button id="logoutBtn">Logout</button>
            </div>
          </div>
          <div id="box2i">
            <div className="form-element-boxi">
              <div className="input-box1">
              <i class="fa-solid fa-user"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input type="text" placeholder="Enter Item Name" name="item" onChange={inputEvent} />
              </div>
            </div>
            <div className="form-element-boxi">
              <div className="input-box1">
              <i class="fa-solid fa-indian-rupee-sign"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input type="number" placeholder="Enter Item Price" name="price" onChange={inputEvent} />
              </div>
            </div>
            <div className="form-element-boxi">
              <div className="input-box1">
              <i class="fa-solid fa-circle-info"></i>
              </div>
              <hr />
              <div className="input-box2">
                <input type="text" placeholder="Enter Item Description" name="description" onChange={inputEvent} />
              </div>
            </div>

            <div id="button-divi">
              <button onClick={addItem}>Add Item</button>
            </div>
          </div>
          <hr id="notesseparater" />
          <div className="box3"></div>
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
