import Axios from "axios";

export interface EventData {
    eventId: string,
    eventName: string
}

export interface FacebookPost {
    date: Date,
    id: string,
    message: string
}
export default class Utility {

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
        })
    }

    static getEventFullDescription(eventId: string): Promise<JSX.Element> {
        return new Promise((resolve, reject) => {
            Axios.get(`${this.eventbriteEndpoint}/events/${eventId}/description/`, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_EVENTBRITE_PRIVATE_API_TOKEN}`
                }
            })
                .then(res => {
                    resolve(<div dangerouslySetInnerHTML={({ __html: res.data.description })} />)
                })
                .catch(() => reject());
        });
    }

    static getFacebookPosts(): Promise<FacebookPost[]> {
        return new Promise((resolve, reject) => {
            Axios.get(`${this.facebookEndpoint}/${process.env.REACT_APP_FACEBOOK_PAGE_ID}/feed?method=get&pretty=0&sdk=joey&suppress_http_code=1&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`)
                .then(response => {
                    if (response.data.data) {
                        resolve(response.data.data.map(((d: { id: any; message: any; creation_time: any; }) => {
                            const post: FacebookPost = {
                                id: d.id,
                                message: d.message,
                                date: d.creation_time
                            }
                            return post;
                        })))
                    }
                    else {
                        reject();
                    }
                });
        })
    }
}