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
    private static eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';

    private static loadedEvents: EventData[] = null;
    private static isLoadingEvents = false;
    private static loadingEventsPromise: Promise<EventData[]> = null;

    /** Returns all the events from Eventbrite */
    static getEventbriteEvents(): Promise<EventData[]> {
        if (this.loadedEvents) {
            return Promise.resolve(this.loadedEvents);

        }
        else {
            if (!this.isLoadingEvents) {
                this.startLoadingEvents();
                return this.loadingEventsPromise;

            }
            else {
                return this.loadingEventsPromise;
            }
        }

    }

    private static startLoadingEvents() {
        this.isLoadingEvents = true;
        this.loadingEventsPromise = Axios.get(`${this.eventbriteEndpoint}/organizations/${process.env.REACT_APP_EVENTBRITE_ORGANIZATION_ID}/events/?order_by=start_asc`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
                }
            })
            .then(res => {
                this.isLoadingEvents = false;
                console.log(res.data.events);
                if (res.data.events) {
                    this.loadedEvents = res.data.events.map((ev: any) => {
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
                    return this.loadedEvents;
                }
                else {
                    throw new Error('No events returned');
                }
            });
    }

    /** Returns a JSX.Element containing the full description of an event */
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

    static async getEventById(eventId: string): Promise<EventData> {
        if (this.loadedEvents) {
            return Promise.resolve(this.loadedEvents.find(ev => ev.eventId === eventId));
        }
        else {
            if (!this.isLoadingEvents) {
                this.startLoadingEvents();
                await this.loadingEventsPromise;
                return this.getEventById(eventId);
            }
            else {
                await this.loadingEventsPromise;
                return this.getEventById(eventId);
            }
        }
    }
}