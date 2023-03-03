/// Importing The Hooks ----------------------------------------------------------------------------------------------->
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

/// Importing The Css ------------------------------------------------------------------------------------------------->
import "../public/css/signuplogin.css"




/// Function For The LoginPage--------------------------------------------->
function LoginPage(){
    // Using The useState Hook _______________________________________________/
    const [initialFormData,setFormData]=useState({
        email:"",
        password:""
    });	
    const [initialResponseData,setResponseData]=useState();
    // Using The useNavigate Hook ____________________________________________/
    const navigate=useNavigate();    
    // Function For The InputEvent ___________________________________________/
    function inputEvent(e){
        const {name,value}=e.target
        setFormData((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }
    
    // Function For Login Form Submit ________________________________________/
    async function loginFormSubmit(e){
        e.preventDefault();
        const data=JSON.stringify({email:initialFormData.email,password:initialFormData.password});
        const response=await fetch("/usermanagementsystem/api/v1/users/loginusers",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:data
        });
        const responseData=await response.json();
        switch (responseData.success) {
            case true:
                alert(responseData.msg)
                break;
            case false:
             setResponseData(responseData.msg);
             break
            default:
                setResponseData("Unable To Login")
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
                <form className="login" onSubmit={loginFormSubmit}>
                
                    <div className="login__field">
                        <i className="login__icon fa-solid fa-envelope"></i>
                        <input type="text" className="login__input" name="email" placeholder="Email" onChange={inputEvent} />
                    </div>
                  
                    <div className="login__field">
                        <i className="login__icon fas fa-lock"></i>
                        <input type="password" className="login__input" name="password" placeholder="Password" onChange={inputEvent}/>
                    </div>
                    <button className="button login__submit">
                        <span className="button__text">Login Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>		
                    
                    <button className="button login__submit" onClick={()=>navigate("/adminpanel/signup")}>
                    <span className="button__text">Sign Up Now</span>
                    <i className="button__icon fas fa-chevron-left"></i>
                    
                        
                    
                    </button>
                    <br />
                    <div className="msgShowBox">
                        {checkResponseMsg()}
                        </div>			
                </form>
                <div className="social-login">
                    <p>Forget Password?</p>
                    
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

export default LoginPage;