const email = (v)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(v)){
       console.log("regex working")
       return "Invalid Email";
    }
    return null ;
 
 }
 const required =(v)=>{
   
    if(v.length === 0){
       
        console.log("length not equal to zero")
        console.log(v)

        return "Requried";
      
    }
    else if(v[0]== ""){
        console.log("v given" , v)
        return "REdooo"
       } 
    return null
 }
  const is_errorCheck =(v)=>{
    if (v[0] == " ") {
        return "Enter correct Value"
    }
  }

  const spaceRegex =(v)=>{
    const regexPattern = /^\s*\w+(\s?$|\s{2,}\w+)+/
    console.log(regexPattern.test())
    if( regexPattern.test(v)){
        // console.log("PAttern Check works")
        return "InValid Password"
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
        },
        emptyCheck : ()=>{
            const emptyCheckError = is_errorCheck(v);
            console.log("Empaty Obje",emptyCheckError)
            return {
                message: emailValidate,
                required: emptyCheckError,
            };  
        }
    }

    },

    required:(v)=>{
        const  fieldValidate = required(v)
        console.log("validate Object")
        console.log(fieldValidate)
        return {
            message: fieldValidate,
            regex : (v)=>{
                const regexCheck = spaceRegex(v)
                console.log("pattern required data") 
                return {
                    message : regexCheck,
                    required :fieldValidate
                }
            }
        }

    }

    
 }
 export  default ValidateData;