import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import EventPage from "../../pages/eventPage/EventPage";
import HomePage from "../../pages/homePage/HomePage";
import AppBar from "../../components/appBar/AppBar";
import TalentreePage from '../../pages/talentreePage/TalentreePage';
import YoutubeVideos from '../../components/youtubeVideos/YoutubeVideos';
import MentorsPage from '../../pages/mentorsPage/MentorsPage';
import ContactPage from '../../pages/contactPage/ContactPage';
import AboutPage from '../../pages/aboutPage/AboutPage';
import React from 'react';
import Footer from '../../components/footer/Footer';

export default function MainRouter() {
    return (
        <Router>
            <AppBar />
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route exact path="/talentree">
                    <TalentreePage />
                </Route>
                <Route path="/event/:eventId">
                    <EventPage />
                </Route>
                <Route exact path="/gallery">
                    <YoutubeVideos />
                </Route>
                <Route exact path="/mentors">
                    <MentorsPage />
                </Route>
                <Route exact path="/contact">
                    <ContactPage />
                </Route>
                <Route exact path="/about">
                    <AboutPage />
                </Route>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
};