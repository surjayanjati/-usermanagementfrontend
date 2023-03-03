/// Importing The Pakages / Modules ---------------------------------------------------------------------------->
import { Routes,Route } from "react-router-dom";
/// Importing The Components ----------------------------------------------------------------------------------->
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";





/// Function For Main ------------------------------------------------------------------------------------------>
function  Main(){
    return(
        <>
        <Routes>
            <Route exact path="/signup" element={<SignupPage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
        </Routes>
        </>
    )
};

/// Exporting The Main ----------------------------------------------------------------------------------------->
export default Main;