/// Importing The Hooks ----------------------------------------------------------------------------------------------------->
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
/// Importing The Css File -------------------------------------------------------------------------------------------------->
import "../public/css/signuplogin.css";





/// Function For The SignupPage--------------------------------------------->
function SignupPage(){
    // Using The useState Hook ________________________________________________________/
    const [initialData,setData]=useState({
        fname:"",
        email:"",
        password:""
    });
    const [initialResponseData,setResponseData]=useState();
    // Using The UseNavigate Hook _____________________________________________________/
    const navigate=useNavigate();
    // Function For Storing The Input Data_____________________________________________/
    function inputEvent(e){
        const {name,value}=e.target;
        setData((preValue)=>{
            return {
                ...preValue,
                [name]:value
            }
        })
    }  
    // Function For The Sign Up Form Submit _________________________________________/
    async function signupFormSubmit(e){
    e.preventDefault();
    
    const signupData=JSON.stringify({userName:initialData.fname,userEmail:initialData.email,userPassword:initialData.password});
         const response=await fetch("/usermanagementsystem/api/v1/users/signupusers",{
            method:"POST",
            headers:{
                "Content-type":"Application/json",
    
            },
            body:signupData
         });
         const responseData=await response.json();
         switch (responseData.success) {
            case true:
                alert(responseData.msg);
                navigate("/login");
                break;
            case false :
                 setResponseData(responseData.msg);
                 break;
            default:
                break;
         }
    }  
    // Function For Checking If any Error Message is There Or Not ------------------------------------------------------------------>
    function checkResponseMsg(){
        if(initialResponseData!==""){
         return <p>{initialResponseData}</p>
        }else {
            return <p></p>
        }
    }
        return(
            <>
          <div className="whole-container">
         <div className="container">
        <div className="screen">
            <div className="screen__content">
                <form className="signup" onSubmit={signupFormSubmit}>
                    <div className="signup__field">
                        <i className="signup__icon fas fa-user"></i>
                        <input type="text" className="signup__input" placeholder="User name " name="fname"  onChange={inputEvent}/>
                    </div>
                    
                    <div className="signup__field">
                        <i className="signup__icon fa-solid fa-envelope"></i>
                        <input type="text" className="signup__input" placeholder="Email" name="email" onChange={inputEvent}/>
                    </div>
                   
                    <div className="signup__field">
                        <i className="signup__icon fas fa-lock"></i>
                        <input type="password" className="signup__input" placeholder="Password" name="password" onChange={inputEvent}/>
                    </div>
                    <button className="button signup__submit">
                        <span className="button__text">Sign Up Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>			
                    <br />
                    <div className="msgShowBox">
                        {checkResponseMsg()}
                        </div>	
                </form>
                <div className="social-login">
                    <p onClick={()=>navigate("/login")} >Have an Account?</p>
                    
                </div>
            </div>
            <div className="screen__background">
            
            </div>		
        </div>
    </div>
    </div>
            </>
        )
};

export default SignupPage;