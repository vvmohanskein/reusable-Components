import { useState } from "react";
import { handleChange } from "../../validation/Validation";
import "./forgotpassword.css";
import ValidateData, { allowsOnlyNumeric, spacePrevent } from "../../validation/Errorhandle";
import { ForgotEmailPostapi, OtpVerificationPostApi } from "../api/Api";
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
export function FogotPassword() {
const navigate = useNavigate()
const location = useLocation()
const parms = useParams();
const initialState ={
  email :''
}
const [formData,setFormData]= useState(initialState)
const [formError,setFormError] = useState(initialState)
const [modelOpen,setModelOpen] = useState(false)
const [otp,setOtp] =useState("")
const [otpError,setOtpError]= useState('')
const handleSubmitLink=(e)=>{
  e.preventDefault();
  const errMsg = ValidateData.email(formData.email).require();

  if(errMsg.required){
    const edata = errMsg.required;
    setFormError((formData)=>({
      ...formData, email : edata
    }))
  }
  else  if(errMsg.message){

    const edata = errMsg.message;
    setFormError((formData)=>({
      ...formData, email : edata
    }))
  }
  else {
    const edata = null
    setFormError((formData)=>({
      ...formData, email : edata
    }))
  }

  if(formError.email === null){
console.log("submit")
ForgotEmailPostapi(formData)
setModelOpen(true)
toast.success("OTP sent Succesfully")
// navigate("/resetpassword",{state :formData.email})
  }
  else{
toast.error("Enter your Email")
  }
}
const handleInputChange =(e)=>{
  const { name, value}= e.target;
  const trimmedValue = value.trim();
console.log(trimmedValue)
  const errEmail = ValidateData.email(trimmedValue).require();
  if(errEmail.required){
    const edata = errEmail.required;
    console.log("QWERT")
    setFormError((formData)=>({
      ...formData, [name] : edata
    }))
  }
  else  if(errEmail.message){
    console.log("elseeeee")

    const edata = errEmail.message;
    setFormError((formData)=>({
      ...formData, [name] : edata
    }))
  }
  else {
    const edata = null;
    setFormError((formData)=>({
      ...formData, [name] : edata
    }))
 

  }
  setFormData((formData) => ({
    ...formData,
    [name]: trimmedValue,
  }));
}

//model function

const otpverifyPayload ={
  "email" : formData.email,
  "otp" : otp
}
const handleOtpsent=(e)=>{
  e.preventDefault()
  console.log(otp)
  const errOtp = ValidateData.otpVerify(otp).otplengthCheck()
  if(errOtp.message){
    console.log("rewqqq")

    const edata = errOtp.message
    setOtpError(edata)
  }
  else if (errOtp.otplengthCheck){
    console.log("123456789",errOtp.otplengthCheck)
    const edata = errOtp.otplengthCheck
    setOtpError(edata)
  }
  else{
    const edata = null
    setOtpError(edata) 
  }

  if(otpError === null ){
    OtpVerificationPostApi(otpverifyPayload)
    toast.success("OTP verified Successfully")
    navigate("/resetpassword", {state : otpverifyPayload})
  }
  // else{
  //   toast.error("Invalid OTP")
  // }

}




  return (

    <div className="main-div-forgot">
     
      <ToastContainer/>
      <div className={modelOpen ? "content-forgot-password-model":"forgot-div"}>
        <div className={"content-forgot-password"}>
       
<div className="key-div">
<svg xmlns="http://www.w3.org/2000/svg"
 fill="white"
 className="key-svg"
 height="30" width="30" 
viewBox="0 0 512 512">
<path
 d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
</svg>

</div>
<div className="content-div-password">
<h4>Forgot Your Password ?</h4>
    <p className="sub-heading-text">No worries! Enter Your Email  and we will sent you a Reset</p>
    <div className="input-div">

<input type="text"
value={formData.mobilenumber}
onKeyPress={allowsOnlyNumeric}
onChange={handleInputChange}
placeholder="Enter Your Mobile Number"
className="inputbox-email"/>
<input type="email"
 name="email"
 value={formData.email}
 onKeyPress={spacePrevent}
 onChange={handleInputChange}
 placeholder="Enter Your Email" className="inputbox-email" />
 {
   !formData.email  && formError.email ?(<span>{formError.email}</span>):
  formData.email && formError.email ?(<span>{formError.email}</span>) :('')
   
 }

<button
onClick={handleSubmitLink}
className="reset-link-btn">Send Reset Link</button>

<button 
onClick={()=>navigate("/")}
className="back-login">
<svg
 xmlns="http://www.w3.org/2000/svg"
 height="16" 
width="14"
fill="black"
 viewBox="0 0 448 512">

<path
 d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
</svg>
 <p className="back-text"> Back to Login</p>
 </button>

</div>
</div>

        </div>
      </div>
      {
            modelOpen ? 
            <div className="model-main">
              <div className="model-sub-div">
              <div className="key-div">
<svg xmlns="http://www.w3.org/2000/svg"
 fill="white"
 className="key-svg"
 height="36" width="36" 
viewBox="0 0 512 512">
<path
 d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
</svg>

</div>
<h4>Enter OTP</h4>

<p className="sub-content-otp">We have Sent you OTP to your registered mail id</p>
<div className="otp-div-content">
  <OtpInput
onKeyPress={allowsOnlyNumeric}
inputType="number"
  onChange={(e)=>{
     setOtp(e)}}
  value={otp}
        numInputs={4}
        // renderSeparator={<>-</>}
        renderInput={(props) => <input {...props} />}
        inputStyle={{

          width: "50px",
         marginLeft:"5px",
          height: "50px",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          backgroundColor: "transparent",
          outline: "none",
        }}
 />
 <div style={{marginLeft:"70px",marginTop:'10px'}} >
  {
 !otp &&  otpError ? <span>{otpError}</span> :
 

otpError && otp ?<span>{otpError}</span>:""

 }</div>
<button
onClick={handleOtpsent}
className="verify-otp-btn">Verify OTP</button>

<button 
 onClick={()=>setModelOpen(false)}
 className="back">
<svg
 xmlns="http://www.w3.org/2000/svg"
 height="16" 
width="14"
 viewBox="0 0 448 512">

<path
 d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
</svg>
 <p className="back-text"> Back</p>
 </button>
  {/* <input type="text" name="digit-1" maxLength={1} data-next="digit-2"/>
  <input type="text" name="digit-2" data-next="digit-3" data-previous= "digit-2"/> */}

</div>
              </div>
              </div>:""
          }
    </div>





  );
}
