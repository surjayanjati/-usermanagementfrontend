/// Importing The Pakages / Modules ---------------------------------------------------------------------------->
import { Routes,Route } from "react-router-dom";
/// Importing The Components ----------------------------------------------------------------------------------->
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import DataLoadingPage from "./components/DataLoadingPage";




/// Function For Main ------------------------------------------------------------------------------------------>
function  Main(){
    return(
        <>
        <Routes>
            <Route exact path="/signup" element={<SignupPage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/loading" element={<DataLoadingPage/>}/>
        </Routes>
        </>
    )
};

/// Exporting The Main ----------------------------------------------------------------------------------------->
export default Main;