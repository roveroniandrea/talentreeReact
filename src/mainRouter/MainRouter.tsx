import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from "../home/Home";
import MyAppBar from "../myAppBar/MyAppBar";

class MainRouter extends React.Component{

    render(){
        return (
            <Router>
                <MyAppBar></MyAppBar>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/2">
                        <h1>Pagina 2</h1>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;