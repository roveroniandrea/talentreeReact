import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import EventbriteApi from "../eventbriteAPI/EventbriteApi";
import Home from "../home/Home";
import MyAppBar from "../myAppBar/MyAppBar";

class MainRouter extends React.Component {

    render() {
        return (
            <Router>
                <EventbriteApi>
                    <MyAppBar></MyAppBar>
                </EventbriteApi>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/talentree">
                        <h1>Pagina Talentree</h1>
                    </Route>
                    <Route path="*">
                        <h1>Not implemented</h1>
                        {/*<Redirect to="/" />*/}
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;