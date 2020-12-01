import { Component, createRef, RefObject } from "react";
import { StaticContext } from "react-router";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Utility } from '../utility/Utility';
import { EventDetails } from './eventDetails/EventDetails';
import styles from './EventPage.module.css';
interface EventPageState {
    eventFullDescription: JSX.Element;
}

class EventPage extends Component<RouteComponentProps, EventPageState>{
    widgetRef: RefObject<HTMLDivElement>;

    constructor(props: RouteComponentProps<{}, StaticContext, unknown> | Readonly<RouteComponentProps<{}, StaticContext, unknown>>) {
        super(props);
        this.state = {
            eventFullDescription: <h1>Loading...</h1>
        };
        this.widgetRef = createRef<HTMLDivElement>();
    }

    componentDidUpdate(prevProps: RouteComponentProps<{}, StaticContext, unknown> | Readonly<RouteComponentProps<{}, StaticContext, unknown>>, _prevState: EventPageState) {
        if ((this.props.match.params as any).eventId !== (prevProps.match.params as any).eventId) {
            this.loadDescriptionAndTickets();
        }
    }

    componentDidMount() {
        this.loadDescriptionAndTickets();
    }

    render() {
        const eventId = (this.props.match.params as any).eventId;
        //Opzione 3 + 2
        return (
            <div className={ styles.container + ' content box columns' }>
                <div className={ 'column ' + styles.parentDescription }>
                    <EventDetails eventId={ eventId } />
                    { this.state.eventFullDescription }
                    <div ref={ this.widgetRef } id={ `eventbrite-widget-container-${eventId}` }></div>
                </div>
            </div>
        );
    }

    private getDescription() {
        this.setState({
            eventFullDescription: <h1>Loading...</h1>
        });
        //Opzione 3
        Utility.getEventFullDescription((this.props.match.params as any).eventId)
            .then(desc => this.setState({
                eventFullDescription: desc
            }));
    }

    private loadDescriptionAndTickets() {
        const eventId = (this.props.match.params as any).eventId;
        if (this.widgetRef.current) {
            this.widgetRef.current.innerHTML = '';
        }
        // Opzione 2
        (window as any).EBWidgets.createWidget({
            // Required
            widgetType: 'checkout',
            eventId: eventId,
            iframeContainerId: `eventbrite-widget-container-${eventId}`,

            // Optional
            iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
        });
        this.getDescription();
    }
}

export default withRouter(EventPage);