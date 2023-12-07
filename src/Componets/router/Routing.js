import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Login"
import Signup from "../signup/Signup"
import { FogotPassword } from "../forgotpassword/ForgotPassword"
import { ResetPassword } from "../forgotpassword/ResetPassword"


export default function Routing(){


    return(

        <BrowserRouter>
        <Routes>
        <Route path="/"  element={<Login/>}/>
        <Route path="/signup"  element={<Signup/>}/>
        <Route path="/forgotpassword"  element={<FogotPassword/>}/>
        <Route path="/resetpassword"  element={<ResetPassword/>}/>
        </Routes>
        </BrowserRouter>
    )
}