/// Importing The Css --------------------------------------------------------------------------------->
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../public/css/notes.css";
/// Importing The Componenets ------------------------------------------------------------------------->
import SearchBox from "./SearchBox";
import DataTable from "./DataTable";
import LogoutButton from "./LogoutButton";
/// Importing The Action ----------------------------------------------------------------------------->
import { getData,emptyStore } from "../Actions/managementAction";


/// Function For The CurdBox--------------------------------------------------------------------------->
function ItemDetails() {
const [initialFormValue,setFormValue]=useState({
  item:"",
  price:"",
  description:""
});
const [cookies,setCookie,removeCookie]=useCookies(["loginCookie"]);
const navigate=useNavigate();
const dispatch=useDispatch()
const data=useSelector((event)=>event.managementReducer);

function checkValue(){
  if(data.length!==0){
    return <DataTable/>
  }else {
    return <p>No Data Yet</p>
  }
}
/// Use Effect Hook For Calling Fetch Request _____________________________/
async function fetchValue(){
  const response=await fetch("/usermanagementsystem/api/v1/users/searchallitems",{
    method:"GET",
    headers:{
     "Content-type":"Application/json",
      "access-token":cookies.loginCookie
    },
  });
  const responseData=await response.json();
  console.log(responseData);
  if(responseData.success===true){
    dispatch(getData(responseData.dataArray))
  }else if(responseData.success===false){

    navigate("/login")
  }
  
}
useEffect(()=>{
fetchValue()
},[])

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
    removeCookie("loginCookie");
    dispatch(emptyStore());
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
            <LogoutButton />
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
          <div className="box3">
            <div id="searchbox" style={{height:"5%",display:"flex",flexDirection:"row",width:"100%"}}>
              
            <SearchBox/>
            </div>
            <div className="table"style={{height:"80%",display:"flex",flexDirection:"column",width:"100%",paddingTop:"2%",justifyContent:"center",alignItems:"center"}}>
            {checkValue()}
            </div>
            <div className="pagination-box"style={{height:"15%",display:"flex",flexDirection:"row",width:"100%",paddingTop:"2%",paddingLeft:"5%" ,paddingRight:"5%" ,justifyContent:"space-between",alignItems:"center"}}>
            <i class="fa-solid fa-file"></i>
             <div className="arrow-box"style={{display:"flex",flexDirection:"row",width:"20%",justifyContent:"space-between",alignItems:"center"}}>
             <i class="fa-solid fa-arrow-left"></i>
             <i class="fa-solid fa-arrow-right"></i>
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
