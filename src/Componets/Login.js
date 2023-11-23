import "./login.css";
import googleimg from "./bgimg1.svg";
import { useEffect, useState } from "react";
import bgimg from "./bgimg.jpg";
import { handleChange, handleSubmit } from "../validation/Validation";
import app, { auth, provider } from "../validation/Auth";
import  {signInWithPopup} from "firebase/auth";
import ValidateData from "../validation/Errorhandle";
import { useNavigate } from "react-router-dom";
export function Login() {

  // const navigate = useNavigate()
  const initialState = {
    email: "",
    password: "",
   
  };

  
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(initialState);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const callBacks = (formData, formError, setFormError) => {
    console.log("Call back Activiated", formError);
  };


  useEffect(()=>{
    console.log("Use Effect Working")
    console.log(formError)
  },[formError])



  const handleSubmit=(e)=>{
    // e.preventDefault()
    const errMsg = ValidateData.email(formData.email).require()
    console.log("err mesg",errMsg)
    if(errMsg.required){
    const edata =  errMsg.required
    setEmailError(edata)
    console.log("errorrr HAndled")
 }
 else if(errMsg.message){
  const edata = errMsg.message
    // setFormError(edata)
    setEmailError(edata)
 }
 else{
    const edata =  null
    setEmailError(edata)
 }
 const errPassword = ValidateData.required(formData.password)
 if(errPassword){
  const edatas = errPassword
  setPasswordError(edatas)
 }
 else{
  const edatas =null
  setPasswordError(edatas)

 }
  }
  const handleGoogleClick=(e)=>{
    e.preventDefault();
    signInWithPopup(auth,provider).then((data)=>{
      console.log("datass",data.user.email)
    }).catch((error)=>{
      console.log(error)
    })
   

  }

  return (
    <div className="main-div">
      <div className="sub-card">
        <div className="image-div">
          <img src={bgimg} className="bg-img" />
        </div>
        <div className="login-div">
          <h3>Login</h3><br/>
          <p className="input-text">Email Id</p>
          <div className="password-div">
            <input
              name="email"
              value={formData.email}
              onChange={(e) =>
                handleChange(e, formData, setFormData, formError)
              }
              className="input-style"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="grey"
              className="password-icon"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
          </div>
          
          {!formData.email && emailError ? (
            <span>{emailError}</span>
          ) : (formData.email && emailError ?(<span>{emailError}</span>):'')
        }
          <p className="input-text">Password</p>
          <div className="password-div">
            <input
              name="password"
              value={formData.password}
              onChange={(e) =>
                handleChange(e, formData, setFormData, formError)
              }
              type={showPassword ? "text" : "password"}
              className="input-style"
            />
            {showPassword ? (
              <svg
                onClick={() => setShowPassword(false)}
                className="password-icon"
                fill="grey"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
              >
                <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
              </svg>
            ) : (
              <svg
                onClick={(e) => setShowPassword(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                className="password-icon"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            )}
          </div>
          {!formData.password && passwordError ? (
            <span>{passwordError}</span>
          ) : (
            ""
          )}

          <button
            onClick={() =>
              handleSubmit()
            }
            className="login-btn"
          >
            Login
          </button>
            <button className="forgot-btn">Forgot Password?</button>
          <p className="input-text">OR</p>
          <div className="google-btn-div">
            <button 
            onClick={handleGoogleClick}
            className="google-btn">
              <svg
                className="google-img"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                id="google"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>

              {/* <img className="google-img" src={googleimg} /> */}
              <p className="continue-google-text">Continue With Google</p>
            </button>
          </div>
          <div className="signup-div">
            <p className="dont-have-text">Don't have an account</p>
             <button 
              // onClick={()=>navigate('/signup')}
            className="signup-text">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
