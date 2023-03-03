//// Importing The Pakages / Modules -------------------------------------------------------------------------->
import { BrowserRouter } from "react-router-dom";
//// Importing The Main Component ---------------------------------------------------------------------------->
import Main from "./Main";




/// Function For App ------------------------------------------------------------------------------------------>
function App(){
  return(
    <>
    <BrowserRouter>
   <Main/> 
    </BrowserRouter>
    </>
  )
};


/// Exporting The Function ------------------------------------------------------------------------------------>
export default App;