import Axios from "axios";

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
/** Stores the data for a single Facebook post*/
export class FacebookPostData {
    readonly date: Date;
    readonly fullId: string;
    readonly message: string;

    constructor(fullId: string, date: Date, message: string) {
        this.date = date;
        this.fullId = fullId;
        this.message = message;
    }

    getPageId() {
        return this.fullId.slice(0, this.fullId.indexOf('_'));
    }

    getPostId() {
        return this.fullId.slice((this.fullId.indexOf('_') + 1));
    }
}
/** Class to interface with APIs */
export class Utility {

    private static eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';
    private static facebookEndpoint = 'https://graph.facebook.com/v9.0';
    private static youtubeEndpoint = 'https://www.googleapis.com/youtube/v3';

    private static loadedEvents: EventData[] = null;
    private static isLoadingEvents = false;
    private static loadingEventsPromise: Promise<EventData[]> = null;

    /** Returns the current school year, i.e. 2020 - 2021 */
    static getCurrentYears(): string {
        const curr = new Date();
        let year = curr.getFullYear();
        // Ad agosto cambio
        if (curr.getMonth() <= 7) {
            year--;
        }
        return `${year} - ${year + 1}`;
    }

    /** Returns all the events from Eventbrite */
    static loadEventbriteEvents(): Promise<EventData[]> {
        if (!this.isLoadingEvents) {
            if (this.loadedEvents) {
                return Promise.resolve(this.loadedEvents);
            }
            else {
                this.startLoadingEvents();
                return this.loadingEventsPromise;
            }
        }
        else {
            return this.loadingEventsPromise;
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

    /** Returns all the facebook posts */
    static getFacebookPosts(): Promise<FacebookPostData[]> {
        return Axios.get(`${this.facebookEndpoint}/${process.env.REACT_APP_FACEBOOK_PAGE_ID}/feed?method=get&pretty=0&sdk=joey&suppress_http_code=1&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`)
            .then(response => {
                if (response.data.data) {
                    return (response.data.data.map(((d: { id: string; creation_time: Date; message: string; }) => new FacebookPostData(d.id, d.creation_time, d.message))));
                }
                else {
                    throw new Error('No posts returned');
                }
            });
    }

    /** Returns the Facebook app id */
    static getAppId() {
        return process.env.REACT_APP_FACEBOOK_APP_ID;
    }

    /** Returns all the youtube videos */
    static loadYoutubeVideos(): Promise<string[]> {
        return Axios.get(`${this.youtubeEndpoint}/search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`)
            .then(res => {
                if (res.data.items) {
                    return res.data.items
                        .filter((item: { id: { kind: string; }; }) => item.id.kind === 'youtube#video')
                        .map((i: { id: { videoId: any; }; }) => i.id.videoId);
                }
                else {
                    throw new Error('No videos returned');
                }
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