import React from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Utility from "../utility/Utility";
import styles from './EventPage.module.css';
interface EventPageState {
    eventFullDescription: JSX.Element
}

class EventPage extends React.Component<RouteComponentProps, EventPageState>{

    eventId: string;

    constructor(props: RouteComponentProps<{}, StaticContext, unknown> | Readonly<RouteComponentProps<{}, StaticContext, unknown>>) {
        super(props);
        this.state = {
            eventFullDescription: <h1>Loading...</h1>
        };
        this.eventId = (this.props.match.params as any).eventId;
    }

    componentDidUpdate() {
        if ((this.props.match.params as any).eventId !== this.eventId) {
            this.eventId = (this.props.match.params as any).eventId;
            this.getDescription();
        }
    }

    componentDidMount() {
        // Opzione 2
        /*(window as any).EBWidgets.createWidget({
            // Required
            widgetType: 'checkout',
            eventId: this.eventId,
            iframeContainerId: `eventbrite-widget-container-${this.eventId}`,

            // Optional
            iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
        });*/
        this.getDescription();
    }

    render() {
        //Opzione 2
        /*return (
            <div>
                <h1>Event id {this.eventId}</h1>
                <div id={`eventbrite-widget-container-${this.eventId}`}></div>
            </div>
        );*/
        //Opzione 3
        return (
            <div className={styles.container + ' content box'}>
                {this.state.eventFullDescription}
                <div className={styles.buttonContainer}>
                    <a target="blank" href={`https://www.eventbrite.it/e/biglietti-laboratorio-html-${this.eventId}`} className="button is-link">
                        <span>Vai su Eventbrite</span>
                        <span className="icon is-small">
                            <i className="fa fa-external-link"></i>
                        </span>
                    </a>
                </div>
            </div>
        );
    }

    private getDescription() {
        this.setState({
            eventFullDescription: <h1>Loading...</h1>
        });
        //Opzione 3
        Utility.getEventFullDescription(this.eventId)
            .then(desc => this.setState({
                eventFullDescription: desc
            }));
    }
}

export default withRouter(EventPage);