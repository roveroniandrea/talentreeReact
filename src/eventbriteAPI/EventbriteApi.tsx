import React from "react";
interface EventbriteApiState {
    loadingEvents: boolean;
    events: Array<{
        eventId: string,
        eventName: string
    }>
}

const initialState: EventbriteApiState = {
    loadingEvents: true,
    events: (Array<{
        eventId: string,
        eventName: string
    }>())
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
        setTimeout(() => {
            this.setState({
                loadingEvents: false,
                events: [
                    {
                        eventId: '1',
                        eventName: 'Coderdojo'
                    },
                    {
                        eventId: '2',
                        eventName: 'Laboratorio HTML'
                    }
                ]
            })
        }, 2000)
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