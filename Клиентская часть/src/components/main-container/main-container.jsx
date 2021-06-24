import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import AuthScreen from "../auth-screen/auth-screen";
import FrontPage from "../front-page/front-page";
import "./main-container.css"
const MainContainer = () =>{
    return(
        <BrowserRouter>
            <Route exact path={"/"} component={AuthScreen}/>
            <Route path={"/main"} component={FrontPage}/>
        </BrowserRouter>
    )
}

export default MainContainer;