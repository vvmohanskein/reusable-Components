

// checking the email regex pattern
const email = (v) => {
  const emailRegex =  /^[^\s$&*!#^@]+@[^\s@]+\.([^\s@]{2,3})+$/ ;
  const regexPattern = /^\s*\w+(\s?$|\s{2,}\w+)+/;

  if (!emailRegex.test(v)) {
      return "InValid Email";
    
  }
  
  return null;
};



// checking  the empty field
const required = (v) => {
  if (v !== undefined || v === null) {
    if (v.length === 0) {
        console.log("data")

      return "Requried";
    } 
    //  if (v[0] == "") {
    //   return "123456789";
    // }

    return null;
  }
};
const is_errorCheck = (v) => {
  if (v[0] == " ") {
    return "Enter correct Value";
  }
  return null;
};



// checking the name by regex pattern
const nameCheckRegex = (v) => {
  const nameRegex = /^[A-Za-z' \-.]+$/;
  if (!nameRegex.test(v)) {
    return "Invalid UserName";
  }
  return null;
};

// preventing the alpha typing in the number field
const numberRegex = (v) => {
  const numberRegexPattern = [["-", "+", "e", ".", "E"]];

  if (numberRegexPattern.includes(v)) {
    return "Enter Number Only";
  } else {
    return null;
  }
};



// input length check for mobile number input field
const numberLimitControl = (v) => {
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

  if (v.length <= 9) {
    return "Minimum 10-digit  Requried";
  } else if (v.length > 10) {
    return "Mobile Number limit: 10 digits";
  } else {
    return null;
  }
};

const spaceRegex = (v) => {
  const regexPattern = /^\s*\w+(\s?$|\s{2,}\w+)+/;
  console.log(regexPattern.test());
  // if( !regexPattern.test(v)){
  //     // console.log("PAttern Check works")
  //     return "Invalid Password"
  // }
  return null;
};


// checking the empty date field 
const requiredDate = (v) => {
  if (v === "" || v == "" || v === null || v === undefined) {
    return "Requried";
  } else {
    return null;
  }
};



// comparing the date value from the input and  checking according  below condition
const dateCompare = (v) => {
  const maxDate = new Date("2000-12-31").toISOString().split("T")[0];
  const minDate = new Date("1970-01-01").toISOString().split("T")[0];

  const todayDate = new Date().toISOString().split("T")[0];
  if (isNaN(v) && v >= maxDate) {
    const edata = "Invalid Date & exceeds maximum date";
    return edata;
  } else if (isNaN(v) && v < minDate) {
    const edata = "Invalid Date & below minimum date";
    return edata;
  } else {
    const edata = null;
    return edata;
  }
};


// password regex check  based on below regex pattern
const passwordRegexCheck = (v) => {
  //const passwordRegex = /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~\\-])(?=.*[A-Z])(?=.*\d).{8,}$/
  const passwordRegex =
    /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@$!%*#?&]*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/;
  if (!passwordRegex.test(v)) {
    return "Password Needs  a UpperCase, a Lower Case, a Number and a Symbol.";
  } else {
    return null;
  }
};

//checking the length of the password based on below condition
const passwordLimitCheck = (v) => {
  if (v.length >= 4 && v.length < 8) {
    return "Minimum 8 Character  Requried";
  }
//    else if (v.length > 12) {
//     return "password should be below 12 Character";
//   }
   else {
    return null;
  }
};



// comparing the password and confirm password  and checking the values for the same
const comparePassword = (p, cp) => {
  if (p !== "" && cp != "" && p == cp) {
    return null;
  } else {
    return "Password & Confirm Password Should be Same";
  }
};


//  checking the length on otp field

const otpLengthValidate=(v)=>{

    if(v.length != 4){
        return "Invalid OTP"
        console.log("invalid otp")
    }
    else{
        return null
    }
}

// encloses multiple functions
const ValidateData = {
  email: (v) => {
    const emailValidate = email(v);
    return {
      message: emailValidate,
      require: () => {
        const requiredError = required(v);
        return {
          message: emailValidate,
          required: requiredError,
        };
      },
    };
  },

  usernameCheck: (v) => {
    const nameValidate = required(v);

    return {
      message: nameValidate,
      nameCheck: () => {
        const nameCheckValidate = nameCheckRegex(v);
        return {
          message: nameValidate,
          nameCheck: nameCheckValidate,
        };
      },
    };
  },

  mobileNumberCheck: (v) => {
    const fieldValidate = required(v);

    return {
      message: fieldValidate,
      numberRegexCheck: () => {
        const numberDataCheck = numberRegex(v);
        return {
          message: fieldValidate,
          numberRegexCheck: numberDataCheck,
          numberLimitCheck: () => {
            const numberLimit = numberLimitControl(v);

            return {
              message: fieldValidate,
              numberRegexCheck: numberDataCheck,
              numberLimitCheck: numberLimit,
            };
          },
        };
      },
    };
  },

  required: (v) => {
    const fieldValidate = required(v);

    return {
      message: fieldValidate,
      regex: (v) => {
        const regexCheck = spaceRegex(v);
        return {
          message: regexCheck,
          required: fieldValidate,
        };
      },
    };
  },

  dateValidate: (v) => {
    const errDate = requiredDate(v);
    // console.log(errDate)
    return {
      message: errDate,
      correctDateCheck: () => {
        const dateCheck = dateCompare(v);
        return {
          message: errDate,
          required: dateCheck,
        };
      },
    };
  },

  password: (v) => {
    const checkPassword = required(v);
    return {
      message: checkPassword,
      passwordRegex: () => {
        const errpassword = passwordRegexCheck(v);
        return {
          message: checkPassword,
          passwordRegex: errpassword,
          passwordLimit: () => {
            const limitCheck = passwordLimitCheck(v);

            return {
              message: checkPassword,
              passwordRegex: errpassword,
              passwordLimit: limitCheck,
            };
          },
        };
      },
    };
  },

  cpasswordCheck: (p, cp) => {
    const checkEmpty = required(cp);
    return {
      message: checkEmpty,
      comparingPassword: () => {
        const comparePasswordCheck = comparePassword(p, cp);
        return {
          message: checkEmpty,
          comparingPassword: comparePasswordCheck,
        };
      },
    };

  },

  otpVerify : (v)=>{
    const checkEmpty = required(v)
    return {
        message :checkEmpty,
        otplengthCheck : ()=>{
            const lengthCheck = otpLengthValidate(v);
            return{
                message : checkEmpty,
                otplengthCheck : lengthCheck
            }
        }
    }
  }
};

export function allowsOnlyNumeric(e) {
  const re = /^[0-9\b]+$/;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}
export function spacePrevent(e) {
    if (e.code === 'Space') {
        // Prevent the default behavior (typing a space)
        e.preventDefault();
    }
  }

export default ValidateData;
