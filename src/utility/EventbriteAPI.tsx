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

export interface EventsGroups {
    talentree: EventData[],
    nextActivities: EventData[],
    old: EventData[],
};

export class EventBriteAPI {
    /** Endpoint of Eventbrite APIs */
    private static eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';

    /** All the events */
    private static loadedEvents: EventsGroups = null;
    /** True if is currently requesting events from the endpoint */
    private static isLoadingEvents = false;
    /** Promise used to retrieve the events after loaded */
    private static loadingEventsPromise: Promise<EventsGroups> = null;

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
                    this.loadedEvents = {
                        nextActivities: [],
                        old: [],
                        talentree: []
                    };
                    res.data.events.forEach((ev: any) => {
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
                        let now = new Date().getTime();
                        let maxPassedTime = 3 * 24 * 60 * 60 * 1000;
                        if (event.start.getTime() - now < - maxPassedTime) {
                            this.loadedEvents.old.push(event);
                        }
                        else {
                            if (ev.format_id === '14') { //Game or Competition
                                this.loadedEvents.nextActivities.push(event);
                            }
                            else {
                                //TODO: eventi generali?
                                this.loadedEvents.talentree.push(event);
                            }
                        }
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
        return this.defaultEventRequest(loadedEvents => {
            let ev = loadedEvents.nextActivities.find(ev => ev.eventId === eventId);
            if (!ev) {
                ev = loadedEvents.talentree.find(ev => ev.eventId === eventId);
            }
            if (!ev) {
                ev = loadedEvents.old.find(ev => ev.eventId === eventId);
            }
            return ev;
        });
    }

    /** Returns the events after the current date or max tot time before */
    static async getNextActivities(): Promise<EventData[]> {
        return this.defaultEventRequest(loadedEvents => loadedEvents.nextActivities);
    }

    static async getTalentreeEvents(): Promise<EventData[]> {
        return this.defaultEventRequest(loadedEvents => loadedEvents.talentree);
    }

    private static async defaultEventRequest<T>(callback: (loadedEvents: EventsGroups) => T): Promise<T> {
        if (this.loadedEvents) {
            return Promise.resolve(callback(this.loadedEvents));
        }
        else {
            if (!this.isLoadingEvents) {
                this.startLoadingEvents();
            }
            await this.loadingEventsPromise;
            return this.defaultEventRequest(callback);
        }
    }
}