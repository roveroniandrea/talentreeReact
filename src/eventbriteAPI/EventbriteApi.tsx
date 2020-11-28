import Axios from "axios";
import React from "react";

interface EventData {
    eventId: string,
    eventName: string
}
interface EventbriteApiState {
    loadingEvents: boolean;
    events: Array<EventData>
}

const initialState: EventbriteApiState = {
    loadingEvents: true,
    events: []
};

export const EventbriteEventsContext = React.createContext(initialState)

class EventbriteApi extends React.Component<{}, EventbriteApiState> {

    eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            loadingEvents: true,
            events: []
        }
    }

    componentDidMount() {
        this.loadEvents();
    }

    render() {
        return <EventbriteEventsContext.Provider value={({
            loadingEvents: this.state.loadingEvents,
            events: this.state.events
        })}>
            {this.props.children}
        </ EventbriteEventsContext.Provider>;
    }

    private loadEvents() {
        Axios.get(`${this.eventbriteEndpoint}/organizations/${process.env.REACT_APP_EVENTBRITE_ORGANIZATION_ID}/events/?order_by=start_asc`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
                }
            }).then(res => {
                this.setState({
                    loadingEvents: false,
                    events: res.data.events.map((ev: any) => {
                        const event: EventData = {
                            eventId: ev.id,
                            eventName: ev.name.text
                        }
                        return event;
                    })
                })
            })
    }
}

export default EventbriteApi;