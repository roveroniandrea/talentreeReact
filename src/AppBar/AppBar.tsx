/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EventBriteAPI, EventData } from '../core/eventbrite/EventbriteAPI';
import { Utility } from '../utility/Utility';

interface EventsState {
    loadingEvents: boolean;
    events: Array<EventData>;
}

export default function AppBar() {

    const history = useHistory();
    const [ burgerOpen, setBurgerOpen ] = useState(false);

    const [ events, setEvents ] = useState<EventsState>({
        loadingEvents: true,
        events: []
    });

    useEffect(() => {
        EventBriteAPI.getNextActivities().then(events => {
            setEvents({
                loadingEvents: false,
                events
            });
        });
    }, []);

    const toggleDrawer = () => {
        setBurgerOpen(!burgerOpen);
    };

    const changeToRoute = (path: string) => {
        history.push(path);
        if (burgerOpen) {
            setBurgerOpen(!burgerOpen);
        }
    };
    const buildActivitiesDropdown = (): JSX.Element => {
        if (events.loadingEvents) {
            return (
                <a className="navbar-item">
                    Loading...
                </a>);
        }
        else {
            if (!events.events || events.events.length === 0) {
                return <a className="navbar-item">Nessun evento</a>;
            }
            return (
                <Fragment>
                    {events.events.map(ev => (
                        <a key={ ev.eventId } className="navbar-item" onClick={ () => changeToRoute('/event/' + ev.eventId) }>{ ev.eventName }</a>
                    )) }
                </Fragment>
            );
        }
    };

    return (
        <nav className="navbar is-success" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                </a>

                <a onClick={ () => toggleDrawer() } role="button" className={ `navbar-burger burger ${burgerOpen ? 'is-active' : ''}` } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className={ `navbar-menu ${burgerOpen ? 'is-active' : ''}` }>
                <div className="navbar-start">
                    <a className="navbar-item" onClick={ () => changeToRoute('/') }>
                        Home
                    </a>

                    <a className="navbar-item" onClick={ () => changeToRoute('/talentree') }>
                        Talentree 2020
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Attività { Utility.getCurrentYears() }
                        </a>
                        <div className="navbar-dropdown">
                            { buildActivitiesDropdown() }
                        </div>

                    </div>

                    <a className="navbar-item" onClick={ () => changeToRoute('/gallery') }>
                        Foto e video
                    </a>

                    <a className="navbar-item" onClick={ () => changeToRoute('/mentors') }>
                        I nostri coach
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                Chi siamo
                            </a>
                            <a className="navbar-item">
                                Contatti
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}