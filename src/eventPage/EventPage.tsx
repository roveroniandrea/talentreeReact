import React from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Utility from "../utility/Utility";

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
            eventId: this.state.eventId,
            iframeContainerId: `eventbrite-widget-container-${this.state.eventId}`,

            // Optional
            iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
        });*/
        this.getDescription();
    }

    render() {
        // Opzione 1
        /*return (
            <iframe src={`https://www.eventbrite.it/e/biglietti-laboratorio-html-${this.state.eventId}`} width="100%" height="100%"></iframe>
        );*/
        //Opzione 2
        /*return (
            <div>
                <h1>Event id {this.state.eventId}</h1>
                <div id={`eventbrite-widget-container-${this.state.eventId}`}></div>
            </div>
        );*/
        //Opzione 3
        return this.state.eventFullDescription
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