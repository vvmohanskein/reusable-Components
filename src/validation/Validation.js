import ValidateData from './Errorhandle'

export const handleChange = (e,formData,setFormData,emailError, setEmailError,passwordError,setPasswordError,callBacks)=>{
    const  { name, value } = e.target;
    const trimmedValue = value.trim()
    const errMsg = ValidateData.email(trimmedValue).require();
    if (errMsg.required) {
      const edata = errMsg.required;
      console.log('edata',edata);
      setEmailError(edata);
      console.log("errorrr HAndled");
    } else if (errMsg.message) {
      const edata = errMsg.message;
      // setFormError(edata)
      setEmailError(edata);
    }else {
      const edata = null;
      setEmailError(edata);
    }
    // setPasswordError(ValidateData.required ? ValidateData.required :'')
    

    console.log('errMsg',errMsg);
    setFormData((formData) => ({
      ...formData,
      [name]: trimmedValue,
    }));

 
    if(name === "password" || name === "cpassword"){
      console.log('formdata',formData);
      
        ValidateData.cpasswordCheck(formData.password,formData.cpassword)
        // console.log(formData.password, formData.cpassword)
        // console.log(formData)
      
        // PasswordValidation(formData.password, formData.cpassword)
      }
}
//  export const PasswordValidation =(password, cpassword)=>{
//   console.log(password,cpassword)
//   if(password !== cpassword){
    
//     console.log( "ERROROROR password did not match")
//   }
// else{
//   console.log("password mathes Success")

// }
//  }


 


// export const handleSubmit =(formData,formError,setFormError,callBacks)=>{
   
// const errMsg = ValidateData.email(formData.email)
// console.log(errMsg)
// if(errMsg){
//    const edata = {...formError, email:errMsg}
//    setFormError(edata)
//    console.log("errorrr HAndled")
// }
// else{
//    const edata = {...formError, email:null}
//    setFormError(edata)
// }

//    //  const errors={};
//    //  let isValid = false;
//    //   if(!formData.email){
//    //      isValid = true;
//    //      errors['email'] = "Email Id Requried"
//    //      console.log("ERRORR")

//    //   }
//    //   if(!formData.password){
//    //      isValid = true;
//    //      errors['password'] = "Password Requried"
//    //      console.log("ERRORR")

//    //   }
   

//    //   setFormError(errors)
 
//  callBacks(formData,formError,setFormError)
// }