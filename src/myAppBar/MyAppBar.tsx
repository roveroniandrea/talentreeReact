/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component, Fragment } from 'react';
import { StaticContext } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { EventBriteAPI, EventData } from '../utility/EventbriteAPI';
import { Utility } from "../utility/Utility";

interface MyAppBarState {
    loadingEvents: boolean;
    events: Array<EventData>;
    burgerOpen: boolean;
}

class MyAppBar extends Component<RouteComponentProps, MyAppBarState> {

    constructor(props: RouteComponentProps<{}, StaticContext, unknown> | Readonly<RouteComponentProps<{}, StaticContext, unknown>>) {
        super(props);
        this.state = {
            loadingEvents: true,
            events: [],
            burgerOpen: false
        };
    }

    componentDidMount() {
        EventBriteAPI.getNearEvents().then(events => {
            this.setState({
                loadingEvents: false,
                events
            });
        });
    }

    render() {
        return (
            <nav className="navbar is-success" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>

                    <a onClick={ () => this.toggleDrawer() } role="button" className={ `navbar-burger burger ${this.state.burgerOpen ? 'is-active' : ''}` } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className={ `navbar-menu ${this.state.burgerOpen ? 'is-active' : ''}` }>
                    <div className="navbar-start">
                        <a className="navbar-item" onClick={ () => this.changeToRoute('/') }>
                            Home
                        </a>

                        <a className="navbar-item" onClick={ () => this.changeToRoute('/talentree') }>
                            Talentree 2020
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Attività { Utility.getCurrentYears() }
                            </a>
                            <div className="navbar-dropdown">
                                { this.buildActivitiesDropdown() }
                            </div>

                        </div>

                        <a className="navbar-item" onClick={ () => this.changeToRoute('/gallery') }>
                            Foto e video
                        </a>

                        <a className="navbar-item" onClick={ () => this.changeToRoute('/mentors') }>
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

    changeToRoute(path: string) {
        this.props.history.push(path);
        if (this.state.burgerOpen) {
            this.setState({
                burgerOpen: false
            });
        }
    }

    toggleDrawer() {
        this.setState((state, _props) => ({ burgerOpen: !state.burgerOpen }));
    }

    buildActivitiesDropdown(): JSX.Element {
        if (this.state.loadingEvents) {
            return (
                <a className="navbar-item">
                    Loading...
                </a>);
        }
        else {
            if (!this.state.events || this.state.events.length === 0) {
                return <a className="navbar-item">Nessun evento</a>;
            }
            return (
                <Fragment>
                    {this.state.events.map(ev => (
                        <a key={ ev.eventId } className="navbar-item" onClick={ () => this.changeToRoute('/event/' + ev.eventId) }>{ ev.eventName }</a>
                    )) }
                </Fragment>
            );
        }
    }
}

export default withRouter(MyAppBar);