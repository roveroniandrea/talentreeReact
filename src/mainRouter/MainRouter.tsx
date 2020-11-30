import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import EventPage from "../eventPage/EventPage";
import Home from "../home/Home";
import MyAppBar from "../myAppBar/MyAppBar";

class MainRouter extends Component {

    render() {
        return (
            <Router>
                <MyAppBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/talentree">
                        <h1>Pagina Talentree</h1>
                    </Route>
                    <Route path="/event/:eventId">
                        <EventPage />
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