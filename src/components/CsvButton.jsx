import { useSelector } from "react-redux";
/// Importing The CSV --------------------------------------------------------------------------------->
import { CSVDownload, CSVLink } from "react-csv";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useRef } from "react";

//// Function For The CSV Button--------------------------------------------------------->
function CsvButton(){
    const [cookies, setCookie, removeCookie] = useCookies(["loginCookie"]);
    const [initalData,setData]=useState([]);
    const CsvDownloadRef=useRef(null);
//Using The Redux ------------------------------------------------------>
const data=useSelector((event)=>event.managementReducer);  
async function fetchAllData(){
   
    const response = await fetch(
      "/usermanagementsystem/api/v1/users/allitems",
      {
        method: "GET",
        headers: {
          "Content-type": "Application/json",
          "access-token": cookies.loginCookie,
        },
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.success === true) {
    setData(responseData.dataArray);
    setTimeout(() => {
        CsvDownloadRef.current.link.click(); 
    },500);
    
    } else if (responseData.success === false) {
      alert("Some Internal Server Error, Please try again later");
    }
}

const headers=[
    {label:"name",key:"name"},
    {label:"price",key:"price"},
    {label:"description",key:"description"}
  ]  
    return(
        <>
        <CSVLink data={data} headers={headers}>
              <button>Download Only This</button>
              </CSVLink>
              <CSVLink data={initalData} headers={headers} filename="async_data.csv" target="_blank"ref={CsvDownloadRef}>
              <button onClick={fetchAllData}>Download All Data</button>
              </CSVLink>
        </>
    )
};


export default CsvButton;