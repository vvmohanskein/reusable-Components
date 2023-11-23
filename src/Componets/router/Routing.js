import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Login"


export default function Routing(){


    return(

        <BrowserRouter>
        <Routes>
        <Route path="/"  element={<Login/>}/>
        <Route path="/signup"  element={<Login/>}/>


        </Routes>
        </BrowserRouter>
    )
}