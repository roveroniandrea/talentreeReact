import Axios from "axios";
import { EventData } from "../eventbriteAPI/EventbriteApi";

export default class Utility {

    private static eventbriteEndpoint = 'https://www.eventbriteapi.com/v3';

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
}