import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Login"
import Signup from "../signup/Signup"


export default function Routing(){


    return(

        <BrowserRouter>
        <Routes>
        <Route path="/"  element={<Login/>}/>
        <Route path="/signup"  element={<Signup/>}/>


        </Routes>
        </BrowserRouter>
    )
}