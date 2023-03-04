import { useSelector } from "react-redux";
/// Importing The Componenets ------------------------------------>
import DeleteButton from "./DeleteButton";
import EditModal from "./EditModal";

import "../public/css/notes.css"


function DataTable(){
const data=useSelector((e)=>e.managementReducer);  
console.log(data);  
    return(
        <>
        {data.map((elem,index)=>{
            return ( <div className="box3-notebox">
            <div className="textbox">
              <p>{elem.name}</p>
            </div>
            <div className="emailbox">
              <p>{elem.price}</p>
            </div>
            <div className="typebox">
              <p>{elem.description}</p>
            </div>
            <div className="buttonbox">
            <DeleteButton id={elem.itemId}/>
            </div>
            <div className="buttonbox">
            <EditModal id={elem.itemId} />
            </div>
          </div>)
        })}
        
        </>
    )
};

export default DataTable;