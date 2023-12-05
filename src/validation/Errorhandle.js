const email = (v)=>{
    const emailRegex = /^[^\s$&*!#^@]+@[^\s@]+\.([^\s@]{2,})+$/;
    const regexPattern = /^\s*\w+(\s?$|\s{2,}\w+)+/

    if(!emailRegex.test(v)){
        if(regexPattern.test(v)){
            console.log(regexPattern.test(v))
            return "Invalid Email"
           }
       return "Invalid Email";
      
    }
    return null ;
 
 }
 const required =(v)=>{
   console.log(v);

   if(v !== undefined){

  
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
 }
  const is_errorCheck =(v)=>{
    if (v[0] == " ") {
        return "Enter correct Value"
    }
    return null
  }

  const nameCheckRegex =(v)=>{
    const nameRegex =  /^[A-Za-z' \-.]+$/ ;
    if(!nameRegex.test(v)){
        console.log(v)
        return "Invalid UserName"

    }
    return null

  }
  const numberRegex =(v)=>{
    console.log("v",v)
    const numberRegexPattern = [ ['-', '+', 'e', '.', 'E']]
    if( numberRegexPattern.includes(v)){
        console.log("Number check")

        return "Enter Number Only"
    }
    console.log(" check")

    return null ;
  }

  const numberLimitControl =(v)=>{
    console.log('len',v.length);

    // if(v.length > 3 ){
    //     if(v.length <= 10){
    //       console.log('type below 10');
    //     }else if(v.length > 12){
    //       console.log('type not mopre than a 12');
    //     }
    //   }
    //   else{
    //     console.log('type above 3 else');
    //   }

     if(v.length >=3 && v.length <=9 ){
        return "Minimum 10-digit  requried"

    }else if(v.length >10 ){

        return "Mobile number limit: 10 digits"

    }else{

        return null
    }

  }

  const spaceRegex =(v)=>{
    const regexPattern = /^\s*\w+(\s?$|\s{2,}\w+)+/
    console.log(regexPattern.test())
    // if( !regexPattern.test(v)){
    //     // console.log("PAttern Check works")
    //     return "Invalid Password"
    // }
    return null
  }

  const  dateCompare =(v)=>{
    
  }
  const passwordRegexCheck=(v)=>{
    //const passwordRegex = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~\\-])(?=.*[A-Z])(?=.*\d).{8,}$/
     const passwordRegex = /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@$!%*#?&]*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/
    if(!passwordRegex.test(v)){
        return "Password needs UpperCase,Lower Case, number and symbol."

    }
else{
     return null ;
}
  }



  const comparePassword = (p,cp) =>{
    if(p!=='' && (cp!=''&& p == cp)){
        return null
    }
    
    else {
        return "password & confirm Password should be same"
    }

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
    
    }

    },

    usernameCheck :(v)=>{
        const nameValidate = required(v)

        return{
            message : nameValidate,
            nameCheck : ()=>{
                const nameCheckValidate = nameCheckRegex(v)
                return  {
                    message : nameValidate, 
                    nameCheck : nameCheckValidate,
                };
            }
        }

    },

    mobileNumberCheck :(v)=>{
        console.log("456",v)
        const fieldValidate =  required(v);
        console.log("1",fieldValidate)

        return {
            message : fieldValidate,
            numberRegexCheck :()=>{
                const  numberDataCheck = numberRegex(v);
                console.log("2",numberDataCheck)
                return{
                    message :fieldValidate,
                    numberRegexCheck : numberDataCheck,
                    numberLimitCheck :()=>{
                        const numberLimit = numberLimitControl(v);
                        console.log("3",numberLimit)

                        return {
                            message :fieldValidate,
                            numberRegexCheck :numberDataCheck,
                            numberLimitCheck : numberLimit, 
                        }
                    }
                }

                
            },
         
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

    },

    // dateValidate: (v)=>{
    //         const errDate = ValidateData.required(v)

    //         return {
    //             message:errDate,
    //             correctDateCheck : (v)=>{
    //                 const dateCheck = dateCompare(v)
    //                 return{
    //                     message :dateCheck,
    //                     required:errDate
    //                 }
    //             }
    //         }
    // },

    password : (v)=>{
      const checkPassword = required(v);
      return{
        message: checkPassword,
        passwordRegex : ()=>{
            const errpassword = passwordRegexCheck(v)
            return {
                message :checkPassword,
                passwordRegex:errpassword
            }
        }
      }  
    },

    cpasswordCheck :(p,cp)=>{


            const  checkEmpty = required(cp)
            console.log("ccccc0",checkEmpty);
            return{
                message :checkEmpty,
                comparingPassword : ()=>{
                    const comparePasswordCheck = comparePassword(p,cp)
                    return{
                        message:  checkEmpty,
                        comparingPassword :comparePasswordCheck
                    }
                }
            }
        // const validPasssword = comparePassword(p,cp)
        // console.log('validPasssword',validPasssword);

        // // console.log(validPasssword, p,cp)
        // return  validPasssword;
    }

    
 }
 export  default ValidateData;