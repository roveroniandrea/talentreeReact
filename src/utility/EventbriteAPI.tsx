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

    /** Array of all the events */
    private static loadedEvents: EventData[] = null;
    /** True if is currently requesting events from the endpoint */
    private static isLoadingEvents = false;
    /** Promise used to retrieve the events after loaded */
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

    /** Starts loading the events from the endpoint. Triggers `this.loadingEventsPromise`*/
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

    /** Returns an event given his id */
    static async getEventById(eventId: string): Promise<EventData> {
        if (this.loadedEvents) {
            return Promise.resolve(this.loadedEvents.find(ev => ev.eventId === eventId));
        }
        else {
            if (!this.isLoadingEvents) {
                this.startLoadingEvents();
            }
            await this.loadingEventsPromise;
            return this.getEventById(eventId);
        }
    }

    /** Returns the events after the current date or max tot time before */
    static async getNearEvents(): Promise<EventData[]> {
        if (this.loadedEvents) {
            let now = new Date();
            let maxPassedTime = 3 * 24 * 60 * 60 * 1000;
            let result = this.loadedEvents.filter(ev => (now.getTime() - ev.start.getTime()) < maxPassedTime);
            return Promise.resolve(result);
        }
        else {
            if (!this.isLoadingEvents) {
                this.startLoadingEvents();
            }
            await this.loadingEventsPromise;
            return this.getNearEvents();
        }
    }
}