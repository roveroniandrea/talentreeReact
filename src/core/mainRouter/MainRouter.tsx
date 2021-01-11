import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import loadable from '@loadable/component';

const EventPage = loadable(() => import('../../pages/eventPage/EventPage'));
const HomePage = loadable(() => import('../../pages/homePage/HomePage'));
const AppBar = loadable(() => import('../../components/appBar/AppBar'));
const TalentreePage = loadable(() => import('../../pages/talentreePage/TalentreePage'));
const YoutubeVideos = loadable(() => import('../../components/youtubeVideos/YoutubeVideos'));
const MentorsPage = loadable(() => import('../../pages/mentorsPage/MentorsPage'));
const ContactPage = loadable(() => import('../../pages/contactPage/ContactPage'));
const AboutPage = loadable(() => import('../../pages/aboutPage/AboutPage'));
const Footer = loadable(() => import('../../components/footer/Footer'));

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