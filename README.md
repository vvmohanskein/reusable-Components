The Reusable  Components project  is a dynamic application built  with HTML,CSS and React Js .Here we have created the common components like Login Screen,Signup Screen and Forgot Password Screens  and their Dynamic Functionalities   that can be used for Further Projects.

Components Included :

Login Screen,
Signup Screen,
Forgot Password Screen,
Reset Password Screen,
Error Handling Component,
API component.

Login Screen :
	        In the Login Screen we have  fields like Email id , password ,Login Button, Forgot Password  , Google Login,  and a Signup Button.

Validating  Input Fields :
	 	In the email id,password  input , the onChange Function is Carried out in an separate component called Validation, the values were sent to that component as an arguments from that  component  we validate the values  through an separate  Error Handling Component  we pass the values as the parameter and there we check the values based on the conditions required. 

	After that,in the handle Change Function we set the Errors  in a state  if there is error  or else  null value will be set in the error State and we can show the error  in the respected field.

	And we also validate the input fields in on-submit events  with the same Functions in the error handling Component and set the errors in the respective State.

	Hence, we have validated the  fields in the different  scenarios that Error handling Component  will be managed only for the error message to be shown.

	Then, Same as error handling we have separate component for api calls  by using the functions.


Signup Screen :

		In Signup we have multiple inputs  and we are validating  in the onChange event and  we send the  values to the error handling component and we validate based on the conditions there and those functions will return the values  and put those errors in a state  and throw the error message where it is required.

		In the On-submit event   we validate with the same functions  and set the error in the state.
		After that, we have a separate api component   that has multiple functions. Those functions receive the  values as the parameters and proceed with the api calls and return the promises.

Forgot Password :
		 In this Component  we have an mail id input field and that input will be validated in the onChange and Onsubmit events from the error handling component.

		Then,after that we will proceed to the  Otp input field and here we validate by the function from the error handle component for empty validation .

Reset Password Screen  :
			In this component we will reset the password  by two inputs as password and confirm  password  we  validate that based function from the error handle component.

Error Handle Component :
			This component has multiple functions that include the conditions  that are to be validated based on the  input fields.

Api Component: 
		 This component  will have  multiple functions that includes the api’s based the events it will be triggered.  
			



























<!-- # Getting Started with Create React App -->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
