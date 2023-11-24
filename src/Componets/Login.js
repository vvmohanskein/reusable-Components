import "./login.css";
import googleimg from "./bgimg1.svg";
import { useEffect, useState } from "react";
import bgimg from "./bgimg.jpg";
import { handleChange, handleSubmit } from "../validation/Validation";
import app, { auth, provider } from "../validation/Auth";
import { signInWithPopup } from "firebase/auth";
import ValidateData from "../validation/Errorhandle";
import { useNavigate } from "react-router-dom";


export function Login() {
   const navigate = useNavigate()
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

  useEffect(() => {
    console.log("Use Effect Working");
    console.log(formError);
  }, [formError]);

  const handleSubmit = (e) => {
    // e.preventDefault()
    const errMsg = ValidateData.email(formData.email).require();
    console.log("err mesg", errMsg);
    if (errMsg.required) {
      const edata = errMsg.required;
      setEmailError(edata);
      console.log("errorrr HAndled");
    } else if (errMsg.message) {
      const edata = errMsg.message;
      // setFormError(edata)
      setEmailError(edata);
    }
  
    else {
      const edata = null;
      setEmailError(edata);
    }
    const errPassword = ValidateData.required(formData.password).regex();
    console.log(errPassword)
    if (errPassword.required) {
      const edatas = errPassword.required;
      setPasswordError(edatas);
    }
    else if (errPassword.message){
      const errData = errPassword.message ;
      setPasswordError(errData)
    }
    
    else {
      const edatas = null;
      setPasswordError(edatas);
    }
  };
  const handleGoogleClick = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("datass", data.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
      <div className="sub-card">
        <div className="image-div">
          <img src={bgimg} className="bg-img" />
        </div>
        <div className="login-div">
          <h3 className="login-text">Welcome Back!</h3>
          <h3 className="login-text">Login</h3>
          <br />
          <p className="input-text">Email Id</p>
          <div className="password-div">
            <input
              name="email"
              value={formData.email}
              placeholder="Enter  Mail Id"
              onChange={(e) =>
                handleChange(e, formData, setFormData, formError)
              }
              className="input-style"
            />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="grey"
              className="password-icon"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg> */}
          </div>

          {!formData.email && emailError ? (
            <span>{emailError}</span>
          ) : formData.email && emailError ? (
            <span>{emailError}</span>
          ) : (
            ""
          )}
          <p className="input-text"> Password</p>
          <div className="password-div">
            <input
             placeholder="Enter  Password"
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
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
              </svg>
            ) : (
              <svg
                onClick={(e) => setShowPassword(true)}
                fill="grey"
                className="password-icon"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
              </svg>
            )}
          </div>
          {!formData.password && passwordError ? (
            <span>{passwordError}</span>
          ) : (
            formData.password && passwordError ? (
              <span>{passwordError}</span> 
            ):''

          )}

          <button onClick={() => handleSubmit()} className="login-btn">
            Login
          </button>
          <button className="forgot-btn">Forgot Password?</button>
         <div className="or-text-div">
          <p className="line-text-left"><hr className="hr-line"/></p>
          <p className="">OR</p>
          <p className="line-text-right"><hr/></p>
          </div>
          <div className="google-btn-div">
            <button onClick={handleGoogleClick} className="google-btn">
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
               onClick={()=>navigate('/signup')}
              className="signup-text"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
