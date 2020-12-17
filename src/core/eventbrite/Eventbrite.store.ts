import { atom, selector, selectorFamily } from 'recoil';
import { EventBriteAPI, EventData } from './EventbriteAPI';

const EventbriteEventsState = atom<EventData[]>({
    key: 'EventbriteEventsState',
    default: selector({
        key: 'EventbriteEventsState/default',
        get: () => EventBriteAPI.loadEvents(),
    }),
});

export const CurrentEventIdState = atom<string>({
    key: 'CurrentEventIdState',
    default: '',
});

export const EventFullDescriptionFromId = selectorFamily<JSX.Element, string>({
    key: 'EventFullDescriptionFromId',
    get: (eventId) => () => EventBriteAPI.getEventFullDescription(eventId),
});

export const EventDataFromId = selectorFamily<EventData, string>({
    key: 'EventDataFromId',
    get: (eventId) => ({ get }) => get(EventbriteEventsState).find((event) => event.eventId === eventId),
});

export const TalentreeEvents = selector<EventData[]>({
    key: 'TalentreeEvents',
    get: ({ get }) => get(EventbriteEventsState).filter((event) => event.eventName.includes('Talentree')),
});

export const NextActivities = selector<EventData[]>({
    key: 'NextActivities',
    get: ({ get }) => {
        let events = get(EventbriteEventsState);
        let now = new Date().getTime();
        let maxPassedTime = 3 * 24 * 60 * 60 * 1000;
        return events.filter((event) => event.start.getTime() - now >= -maxPassedTime && !event.eventName.includes('Talentree'));
    },
});
