import React from "react";
import Utility from "../utility/Utility";

export interface EventData {
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

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            loadingEvents: true,
            events: []
        }
    }

    componentDidMount() {
        Utility.loadEventbriteEvents().then(events => {
            this.setState({
                loadingEvents: false,
                events
            })
        })
    }

    render() {
        return <EventbriteEventsContext.Provider value={({
            loadingEvents: this.state.loadingEvents,
            events: this.state.events
        })}>
            {this.props.children}
        </ EventbriteEventsContext.Provider>;
    }
}

export default EventbriteApi;