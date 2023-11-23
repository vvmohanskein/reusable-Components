const email = (v)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(v)){
       console.log("regex working")
       return "Invalid Email";
    }
    return null ;
 
 }
 const required =(v)=>{
    console.log(v)
    if(v.length === 0){
        console.log("length not equal to zero")
        console.log(v)

        return "Requried";
        
    }
    return null
 }
  
 const  ValidateData ={
 
    email : (v)=>{
       const emailValidate = email(v);
       return {
        message: emailValidate,
        require: () => {
            const requiredError = required(v);
            console.log(requiredError)
            return {
                message: emailValidate,
                required: requiredError,
            };
        }
    }

    },

    required:(v)=>{
        const  fieldValidate = required(v)
        console.log("validate Object")
        console.log(fieldValidate)
        return fieldValidate

    }

    
 }
 export  default ValidateData;