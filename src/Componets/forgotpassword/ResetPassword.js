import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import "./resetpassword.css";
import { useState } from "react";
import ValidateData from "../../validation/Errorhandle";
import { ResetPasswordPostApi } from "../api/Api";
import { toast } from "react-toastify";

export function ResetPassword() {
  const parms = useParams();
  const navigate = useNavigate()
  const location = useLocation();
  const initialState= {
    password :'',cpassword:''
  }
const [showPassword,setShowPassword]= useState(false)
const [showCpassword,setShowCpassword]= useState(false)
const [formData,setFormData]= useState(initialState)
const [formError,setFormError]= useState(initialState)

  console.log("location", location.state);

  const handleInputChange = (e)=>{
    const { name , value } =e.target;
    const trimmedValue = value.trim();
    if (name === "password") {
        const errPassword = ValidateData.password(trimmedValue)
          .passwordRegex()
          .passwordLimit();
        if (errPassword.message) {
          // console.log("message",errPassword.message)
          const edata = errPassword.message;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        } else if (errPassword.passwordRegex) {
          // console.log("password regex",errPassword.passwordRegex)
  
          const edata = errPassword.passwordRegex;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        } else if (errPassword.passwordLimit) {
          const edata = errPassword.passwordLimit;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        } else {
          const edata = null;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        }
      }
  
      if (name === "cpassword") {
        const errcpassword = ValidateData.cpasswordCheck(
          formData.password,
          trimmedValue
        ).comparingPassword();
        if (errcpassword.message) {
          const edata = errcpassword.message;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        } else if (errcpassword.comparingPassword) {
          const edata = errcpassword.comparingPassword;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        } else {
          const edata = null;
          setFormError((formError) => ({
            ...formError,
            [name]: edata,
          }));
        }
      }
  
      setFormData((formData) => ({
        ...formData,
        [name]: trimmedValue,
      }));


  }


  const resetPayload={
    emailid : location.email,
    otp:location.otp,
    password :formData.password,
    cpassword : formData.cpassword
  }
  const handleResetSubmit=(e)=>{
    e.preventDefault()
    const errpassword = ValidateData.password(formData.password)
    .passwordRegex()
    .passwordLimit();

  if (errpassword.message) {
    const errorpassword = errpassword.message;
    setFormError((formError) => ({
      ...formError,
      password: errorpassword,
    }));
  } else if (errpassword.passwordRegex) {
    const errorpassword = errpassword.passwordRegex;
    setFormError((formError) => ({
      ...formError,
      password: errorpassword,
    }));
  } else if (errpassword.passwordLimit) {
    const errorpassword = errpassword.passwordLimit;
    setFormError((formError) => ({
      ...formError,
      password: errorpassword,
    }));
  } else {
    const errorpassword = null;
    setFormError((formError) => ({
      ...formError,
      password: errorpassword,
    }));
  }

  const errcpassword = ValidateData.cpasswordCheck(
    formData.password,
    formData.cpassword
  ).comparingPassword();
  if (errcpassword.message) {
    const errorcpassword = errcpassword.message;
    setFormError((formError) => ({
      ...formError,
      cpassword: errorcpassword,
    }));
  } else if (errcpassword.comparingPassword) {
    const errorcpassword = errcpassword.comparingPassword;
    setFormError((formError) => ({
      ...formError,
      cpassword: errorcpassword,
    }));
  } else {
    const errorcpassword = null;
    setFormError((formError) => ({
      ...formError,
      cpassword: errorcpassword,
    }));
  }
  const errDatas = formError
  if(errDatas.password === null && errDatas.cpassword === null){
    console.log("reset donee")
    ResetPasswordPostApi(resetPayload)
    toast.success("Password Changed Successfully")
    navigate("/")
  }
  else{
    console.log("mande")
  }
  }

  return (
    <div className="main-div-resetpassword">
      <div className="sub-div-resetpassword">
        <div className="content-resetpassword">
          <div className="key-div-resetpassword">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="key-svg-resetpassword"
              height="36"
              width="36"
              viewBox="0 0 512 512"
            >
              <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
            </svg>
          </div>
          <h4>Reset Your Password</h4>
<p>{location.state.email}</p>
          <div className="content-div-resetpassword">
          <p className="input-text-reset">Password</p>

            <div className="password-content-resetpassword">
              <input
              name="password"
              value={formData.password}
              type={showPassword ? "text":"password"}
              onChange={handleInputChange}
              className="inputbox-style-resetpassword" />
               {showPassword ? (
                  <svg
                    onClick={() => setShowPassword(false)}
                    className="eye-icon-reset"
                    fill="grey"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowPassword(true)}
                    fill="grey"
                    className="eye-icon-reset"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
               
            </div>
         <div className="err-div-reset">
         {!formData.password && formError.password ? (
                  <span>{formError.password}</span>
                ) : formData.password && formError.password ? (
                  <span>{formError.password}</span>
                ) : (
                  ""
                )}
               </div>
               <p className="input-text-reset">Confirm Password</p>

            <div className="password-content-resetpassword">
              <input 
              name="cpassword"
              value={formData.cpassword}
              type={showCpassword ?"text":"password" }
              onChange={handleInputChange}
              className="inputbox-style-resetpassword" />
              {showCpassword ? (
                  <svg
                    onClick={() => setShowCpassword(false)}
                    className="eye-icon-reset"
                    fill="grey"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowCpassword(true)}
                    fill="grey"
                    className="eye-icon-reset"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
            </div>
            <div className="err-div-reset">
            {!formData.cpassword && formError.cpassword ? (
                  <span>{formError.cpassword}</span>
                ) : formData.cpassword && formError.cpassword ? (
                  <span>{formError.cpassword}</span>
                ) : (
                  ""
                )}
            </div>
            <div className="btn-div-reset">
                <button onClick={handleResetSubmit}
                className="reset-btn"
                >Reset Password</button>
                <button
                onClick={()=>navigate("/")}
                className="back-login-resetpassword"
                >Back to Login</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
