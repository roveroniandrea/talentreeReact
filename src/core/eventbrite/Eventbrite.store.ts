import { atom, selector, selectorFamily } from 'recoil';
import { EventBriteAPI, EventData } from './EventbriteAPI';

/** The atom for all the Eventbrite events loaded */
const EventbriteEventsState = atom<EventData[]>({
    key: 'EventbriteEventsState',
    default: selector({
        key: 'EventbriteEventsState/default',
        get: () => EventBriteAPI.loadEvents(),
    }),
});

/** The atom with the current inspected event */
export const CurrentEventIdState = atom<string>({
    key: 'CurrentEventIdState',
    default: '',
});

/** The selector to get the full event descriptio as `JSX.Element` */
export const EventFullDescriptionFromId = selectorFamily<JSX.Element, string>({
    key: 'EventFullDescriptionFromId',
    get: (eventId) => () => EventBriteAPI.getEventFullDescription(eventId),
});

/** Returns the event data given an eventId. Uses the `EventbriteEventsState` atom*/
export const EventDataFromId = selectorFamily<EventData, string>({
    key: 'EventDataFromId',
    get: (eventId) => ({ get }) => get(EventbriteEventsState).find((event) => event.eventId === eventId),
});

/** Returns only the talentree events. Uses the `EventbriteEventsState` atom */
export const TalentreeEvents = selector<EventData[]>({
    key: 'TalentreeEvents',
    get: ({ get }) => get(EventbriteEventsState).filter((event) => event.eventName.includes('Talentree')),
});

/** Returns only the next activities. Uses the `EventbriteEventsState` atom
 * @param param Wheter to include Talentree events or not
 */
export const NextActivities = selectorFamily<EventData[], boolean>({
    key: 'NextActivities',
    get: (includeTalentreeEvents) => ({ get }) => {
        let events = get(EventbriteEventsState);
        let now = new Date().getTime();
        let maxPassedTime = 3 * 24 * 60 * 60 * 1000;
        return events.filter(
            (event) => event.start.getTime() - now >= -maxPassedTime && (includeTalentreeEvents || !event.eventName.includes('Talentree'))
        );
    },
});
