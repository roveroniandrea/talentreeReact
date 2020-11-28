/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styles from './MyAppBar.module.css';

class MyAppBar extends React.Component<RouteComponentProps> {

    render() {
        return (
            <nav className="navbar is-success" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item" onClick={() => this.changeToRoute('/')}>
                            Home
                        </a>

                        <a className="navbar-item" onClick={() => this.changeToRoute('/talentree')}>
                            Talentree 2020
                        </a>

                        <a className="navbar-item" onClick={() => this.changeToRoute('/activities')}>
                            Attività 2019-2020
                        </a>

                        <a className="navbar-item" onClick={() => this.changeToRoute('/gallery')}>
                            Foto e video
                        </a>

                        <a className="navbar-item" onClick={() => this.changeToRoute('/mentors')}>
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
    }

    openDrawer() {

    }
}

export default withRouter(MyAppBar);