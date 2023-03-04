import { useSelector } from "react-redux";


import "../public/css/notes.css"


function DataTable(){
const data=useSelector((e)=>e.managementReducer);    
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
            
            </div>
            <div className="buttonbox">
          
            </div>
          </div>)
        })}
        
        </>
    )
};

export default DataTable;