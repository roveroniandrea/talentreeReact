import Axios from "axios";

export interface EventData {
    eventId: string,
    eventName: string;
}

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
export class Utility {

    private static eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';
    private static facebookEndpoint = 'https://graph.facebook.com/v9.0';

    static getCurrentYears(): string {
        const curr = new Date();
        let year = curr.getFullYear();
        // Ad agosto cambio
        if (curr.getMonth() <= 7) {
            year--;
        }
        return `${year} - ${year + 1}`;
    }

    static loadEventbriteEvents(): Promise<EventData[]> {
        return new Promise((resolve, reject) => {
            Axios.get(`${this.eventbriteEndpoint}/organizations/${process.env.REACT_APP_EVENTBRITE_ORGANIZATION_ID}/events/?order_by=start_asc`,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
                    }
                })
                .then(res => {
                    const events: EventData[] = res.data.events.map((ev: any) => {
                        const event: EventData = {
                            eventId: ev.id,
                            eventName: ev.name.text
                        };
                        return event;
                    });
                    resolve(events);
                })
                .catch(() => reject());
        });
    }

    static getEventFullDescription(eventId: string): Promise<JSX.Element> {
        return new Promise((resolve, reject) => {
            Axios.get(`${this.eventbriteEndpoint}/events/${eventId}/description/`, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
                }
            })
                .then(res => {
                    resolve(<div dangerouslySetInnerHTML={ ({ __html: res.data.description }) } />);
                })
                .catch(() => reject());
        });
    }

    static getFacebookPosts(): Promise<FacebookPostData[]> {
        return new Promise((resolve, reject) => {
            Axios.get(`${this.facebookEndpoint}/${process.env.REACT_APP_FACEBOOK_PAGE_ID}/feed?method=get&pretty=0&sdk=joey&suppress_http_code=1&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`)
                .then(response => {
                    if (response.data.data) {
                        resolve(response.data.data.map(((d: { id: string; creation_time: Date; message: string; }) => new FacebookPostData(d.id, d.creation_time, d.message))));
                    }
                    else {
                        reject();
                    }
                });
        });
    }

    static getAppId(){
        return process.env.REACT_APP_FACEBOOK_APP_ID;
    }
}