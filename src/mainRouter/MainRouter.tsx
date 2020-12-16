import { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import EventPage from "../eventPage/EventPage";
import Home from "../home/Home";
import AppBar from "../AppBar/AppBar";
import TalentreePage  from '../talentreePage/TalentreePage';
import { YoutubeVideos } from '../youtubeVideos/YoutubeVideos';

class MainRouter extends Component {

    render() {
        return (
            <Router>
                <AppBar/>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/talentree">
                        <TalentreePage/>
                    </Route>
                    <Route path="/event/:eventId">
                        <EventPage />
                    </Route>
                    <Route exact path="/gallery">
                        <YoutubeVideos />
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