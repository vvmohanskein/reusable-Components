import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signup.css";
import bgimgSignup from "../signup.jpg";
import { useEffect, useState } from "react";
import ValidateData, { allowsOnlyNumeric, spacePrevent } from "../../validation/Errorhandle";
import app, { auth, provider } from "../../validation/Auth";
import { signInWithPopup, validatePassword } from "firebase/auth";
import { SignupPostApi } from '../api/Api';
export default function Signup() {
  const initialState = {
    username: "",
    mobilenumber: "",
    emailid: "",
    dob: "",
    password: "",
    cpassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(initialState);
  const [maxDate, setMaxDate] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const handleMaxDate = () => {
    const dateMax = new Date().toISOString().split("T")[0];
    setMaxDate(dateMax);
  };

  useEffect(() => {
    ValidateData.cpasswordCheck();
  }, [formData.password, formData.cpassword, ValidateData]);
  const handleGoogleClick = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((data) => {
        toast.success("Signined Successfully")

        console.log("datass", data.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value)
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (name === "emailid") {
      const emailErr = ValidateData.email(trimmedValue).require();
      if (emailErr.required) {
        const edata = emailErr.required;
        setFormError((formError) => ({
          ...formError,
          [name]: edata,
        }));
      } else if (emailErr.message) {
        const edata = emailErr.message;

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
    if (name === "username") {
      const nameErrMsg = ValidateData.usernameCheck(trimmedValue).nameCheck();
      if (nameErrMsg.message) {
        const edata = nameErrMsg.message;
        setFormError((formError) => ({
          ...formError,
          [name]: edata,
        }));
      } else if (nameErrMsg.nameCheck) {
        const edata = nameErrMsg.nameCheck;
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
    if (name === "mobilenumber") {
      const errNumber = ValidateData.mobileNumberCheck(trimmedValue)
        .numberRegexCheck()
        .numberLimitCheck();
      if (errNumber.message) {
        const edata = errNumber.message;
        setFormError((formError) => ({
          ...formError,
          [name]: edata,
        }));
      } else if (errNumber.numberRegexCheck) {
        const edata = errNumber.numberRegexCheck;

        setFormError((formError) => ({
          ...formError,
          [name]: edata,
        }));
      } else if (errNumber.numberLimitCheck) {
        const edata = errNumber.numberLimitCheck;

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

    if (name === "dob") {
      const errDob = ValidateData.dateValidate(trimmedValue).correctDateCheck();
      if (errDob.message) {
        const edata = errDob.message;
        setFormError((formError) => ({
          ...formError,
          [name]: edata,
        }));
      } else if (errDob.required) {
        const edata = errDob.required;
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

      // const maxDate = new Date("2000-12-31").toISOString().split("T")[0];
      // const todayDate = new Date().toISOString().split("T")[0];
      // console.log(todayDate);
      // if (isNaN(trimmedValue) && trimmedValue >= maxDate) {
      //   const edata = "Invalid Date & exceeds maximum date";
      //   setFormError((formError) => ({
      //     ...formError,
      //     [name]: edata,
      //   }));
      // } else {
      //   const edata = null;
      //   setFormError((formError) => ({
      //     ...formError,
      //     [name]: edata,
      //   }));
      // }
    }

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
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    const errMsg = ValidateData.email(formData.emailid).require();
    if (errMsg.required) {
      let errorData = errMsg.required;
      setFormError((formError) => ({
        ...formError,
        emailid: errorData,
      }));
    } else if (errMsg.message) {
      const errorData = errMsg.message;

      setFormError((formError) => ({
        ...formError,
        emailid: errorData,
      }));
    } else {
      const errorData = null;

      setFormError((formError) => ({
        ...formError,
        emailid: errorData,
      }));
    }
    const errusername = ValidateData.usernameCheck(
      formData.username
    ).nameCheck();
    if (errusername.message) {
      const errorname = errusername.message;
      setFormError((formError) => ({
        ...formError,
        username: errorname,
      }));
    } else if (errusername.nameCheck) {
      const errorname = errusername.nameCheck;
      setFormError((formError) => ({
        ...formError,
        username: errorname,
      }));
    } else {
      const errorname = null;
      setFormError((formError) => ({
        ...formError,
        username: errorname,
      }));
    }
    const errmobilenumber = ValidateData.mobileNumberCheck(
      formData.mobilenumber
    )
      .numberRegexCheck()
      .numberLimitCheck();
    if (errmobilenumber.message) {
      const errornumber = errmobilenumber.message;
      setFormError((formError) => ({
        ...formError,
        mobilenumber: errornumber,
      }));
    } else if (errmobilenumber.numberRegexCheck) {
      const errornumber = errmobilenumber.numberRegexCheck;
      setFormError((formError) => ({
        ...formError,
        mobilenumber: errornumber,
      }));
    } else if (errmobilenumber.numberLimitCheck) {
      const errornumber = errmobilenumber.numberLimitCheck;
      setFormError((formError) => ({
        ...formError,
        mobilenumber: errornumber,
      }));
    } else {
      const errornumber = null;
      setFormError((formError) => ({
        ...formError,
        mobilenumber: errornumber,
      }));
    }

    const errDateOn = ValidateData.dateValidate(
      formData.dob
    ).correctDateCheck();
    if (errDateOn.message) {
      const errornumber = errDateOn.message;
      setFormError((formError) => ({
        ...formError,
        dob: errornumber,
      }));
    } else if (errDateOn.required) {
      const errornumber = errDateOn.required;
      setFormError((formError) => ({
        ...formError,
        dob: errornumber,
      }));
    } else {
      const errornumber = null;
      setFormError((formError) => ({
        ...formError,
        dob: errornumber,
      }));
    }

    // const maxDate = new Date("2000-12-31").toISOString().split("T")[0];
    // const minDate = new Date("1970-01-01").toISOString().split("T")[0];

    // const todayDate = new Date().toISOString().split("T")[0];
    // console.log(todayDate);
    // if (isNaN(formData.dob) && formData.dob >= maxDate) {
    //   const edata = "Invalid Date & exceeds maximum date";
    //   setFormError((formError) => ({
    //     ...formError,
    //     dob: edata,
    //   }));
    // }
    // else if (isNaN(formData.dob) && formData.dob < minDate){
    //   const edata = "Invalid Date & below minmum date";
    //   setFormError((formError) => ({
    //     ...formError,
    //     dob: edata,
    //   }));
    // }
    // else {
    //   const edata = null;
    //   setFormError((formError) => ({
    //     ...formError,
    //     dob: edata,
    //   }));
    // }

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
    console.log(errDatas)

   
if(errDatas.username === null && errDatas.mobilenumber === null && errDatas.dob === null
    && errDatas.password ===null && errDatas.cpassword === null && errDatas.emailid === null){

      SignupPostApi(formData)
    }
else{
  toast.error("All fields are mandetory")
}
  };

  return (
    <div className="main-div-signup">
      <ToastContainer/>
      <div className="sub-content">
        <div className="images-div">
          <img className="bg-img-signup" src={bgimgSignup} />
        </div>
        <div className="contents-main-div">
          <div>
            <h4 className="signup-heading">Create your account</h4>
          </div>
          <div className="contents-div">
            <div className="grid-items">
              <p className="input-text-signup">Username</p>
              <input
                className="inputbox-style"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
              <div>
                {!formData.username && formError.username ? (
                  <span>{formError.username}</span>
                ) : formData.username && formError.username ? (
                  <span>{formError.username}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="grid-items">
              <p className="input-text-signup">Mobile Number</p>
              <input
                className="inputbox-style-number"
                name="mobilenumber"
                type="number"
                onKeyPress={allowsOnlyNumeric}
                value={formData.mobilenumber}
                onChange={handleInputChange}
              />
              <div>
                {!formData.mobilenumber && formError.mobilenumber ? (
                  <span>{formError.mobilenumber}</span>
                ) : formData.mobilenumber && formError.mobilenumber ? (
                  <span>{formError.mobilenumber}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grid-items">
              <p className="input-text-signup">Date of Birth </p>
              <input
                name="dob"
                className="inputbox-style"
                type="date"
                max={"2000-12-31"}
                value={formData.dob}
                onChange={handleInputChange}
              />
              <div>
                {!formData.dob && formError.dob ? (
                  <span>{formError.dob}</span>
                ) : formData.dob && formError.dob ? (
                  <span>{formError.dob}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="grid-items">
              <p className="input-text-signup">Email Id</p>
              <input
                className="inputbox-style"
                name="emailid"
                type="email"
                onKeyPress={spacePrevent}
                value={formData.emailid}
                onChange={handleInputChange}
              />
              <div>
                {!formData.emailid && formError.emailid ? (
                  <span>{formError.emailid}</span>
                ) : formData.emailid && formError.emailid ? (
                  <span>{formError.emailid}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="grid-items ">
              <p className="input-text-signup">Password</p>
              <div className="password-div-signup">
                <input
                  className="inputbox-style"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                />

                {showPassword ? (
                  <svg
                    onClick={() => setShowPassword(false)}
                    className="password-icon-signup "
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
                    className="password-icon-signup "
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </div>

              <div className="err-msg-span">
                {!formData.password && formError.password ? (
                  <span>{formError.password}</span>
                ) : formData.password && formError.password ? (
                  <span>{formError.password}</span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="grid-items">
              <p className="input-text-signup">Confirm Password</p>

              <div className="password-div-signup">
                <input
                  className="inputbox-style"
                  name="cpassword"
                  type={showCpassword ? "text" : "password"}
                  value={formData.cpassword}
                  onChange={handleInputChange}
                />
                {showCpassword ? (
                  <svg
                    onClick={() => setShowCpassword(false)}
                    className="password-icon-signup "
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
                    className="password-icon-signup "
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </div>
              <div>
                {!formData.cpassword && formError.cpassword ? (
                  <span>{formError.cpassword}</span>
                ) : formData.cpassword && formError.cpassword ? (
                  <span>{formError.cpassword}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="btn-content">
            <div className="btn-main-div">
              <button className="signup-btn" onClick={handleSubmitSignup}>
                Submit
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setFormData(initialState);
                  setFormError(initialState);
                }}
              >
                cancel
              </button>
            </div>

            <div className="or-text-div-main">
              <p className="line-text-left">
                <hr className="hr-line" />
              </p>
              <p className="or-text-signup">OR</p>
              <p className="line-text-right">
                <hr />
              </p>
            </div>
            <div className="google-btn-signup-div">
              <button onClick={handleGoogleClick} className="google-btn-signup">
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

                <p className="continue-google-text-signup">
                  Continue With Google
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
