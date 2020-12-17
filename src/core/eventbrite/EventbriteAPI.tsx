import Axios from 'axios';

/** Stores the data for a single Eventbrite event */
export interface EventData {
    eventId: string,
    eventName: string;
    start: Date;
    logo: {
        url: string,
        height: number,
        width: number;
    };
}

export class EventBriteAPI {
    /** Endpoint of Eventbrite APIs */
    private static eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';

    /** Loads the events from the endpoint*/
    public static loadEvents(): Promise<EventData[]> {
        return Axios.get(`${this.eventbriteEndpoint}/organizations/${process.env.REACT_APP_EVENTBRITE_ORGANIZATION_ID}/events/?order_by=start_asc`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
                }
            })
            .then(res => {
                if (res.data.events) {
                    return res.data.events.map((ev: any) => {
                        const event: EventData = {
                            eventId: ev.id,
                            eventName: ev.name.text,
                            start: new Date(ev.start.utc),
                            logo: {
                                url: ev.logo.url,
                                height: ev.logo.crop_mask.height,
                                width: ev.logo.crop_mask.width
                            }
                        };
                        return event;
                    });
                }
                else {
                    throw new Error('No events returned');
                }
            });
    }

    /** Returns a `JSX.Element` containing the full description of an event */
    static getEventFullDescription(eventId: string): Promise<JSX.Element> {
        return Axios.get(`${this.eventbriteEndpoint}/events/${eventId}/description/`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
            }
        })
            .then(res => {
                return (<div dangerouslySetInnerHTML={ ({ __html: res.data.description }) } />);
            });
    }
}