import { createRef, CSSProperties, Suspense } from "react";
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { CurrentEventIdState, EventFullDescriptionFromId } from '../core/eventbrite/Eventbrite.store';
import EventDetails from './eventDetails/EventDetails';
import EventIFrame from './eventIframe/EventIFrame';

const styles: {
    [ key: string ]: CSSProperties;
} = {
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    parentDescriptionDivFirstchild: {
        textAlign: 'center',
        fontSize: 'xx-large',
        fontWeight: 'bold',
    }
};

export default function EventPage() {
    const parentDescriptionRef = createRef<HTMLDivElement>();
    const { eventId } = useParams<{ eventId: string; }>();
    const setCurrentEventIdState = useSetRecoilState(CurrentEventIdState);
    setCurrentEventIdState(eventId);

    const eventDescription = useRecoilValueLoadable(EventFullDescriptionFromId(eventId));

    return (
        <div className='content box columns' style={ styles.container }>
            <div ref={ parentDescriptionRef } className='column'>
                <EventDetails eventId={ eventId } />
                { eventDescription.state === 'hasValue' ? eventDescription.contents : null }
                <EventIFrame eventId={ eventId } />
            </div>
        </div>
    );
}