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

    /**
     * // TODO: lanciato colo la prima volta, altrimenti re-render infinito. Serve a settare un css al sottotitolo
        if (parentDescriptionRef.current) {
            const elem = (parentDescriptionRef.current.querySelector(':nth-child(3)')?.previousElementSibling as any);
            if (elem) {
                elem.style = {
                    ...elem.style,
                    ...styles.parentDescriptionDivFirstchild
                };
            }
        }
     */


    return (
        <div className='content box columns' style={ styles.container }>
            <div ref={ parentDescriptionRef } className='column'>
                <Suspense fallback={ <h2 className="title">Loading...</h2> }>
                    <EventDetails eventId={ eventId } />
                </Suspense>
                { eventDescription.state === 'hasValue' ? eventDescription.contents : null }
                <EventIFrame eventId={ eventId } />
            </div>
        </div>
    );
}