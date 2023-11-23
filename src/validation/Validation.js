import ValidateData from './Errorhandle'

export const handleChange = (e,formData,setFormData)=>{
    // console.log(e.target.value)
    const  { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
    // console.log(formData)
}

 


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