import { createRef, CSSProperties, Suspense, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { CurrentEventIdState, EventFullDescriptionFromId } from '../core/eventbrite/Eventbrite.store';
import EventDetails from './eventDetails/EventDetails';

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
    const widgetRef = createRef<HTMLDivElement>();
    const parentDescriptionRef = createRef<HTMLDivElement>();
    const { eventId } = useParams<{ eventId: string; }>();
    const setCurrentEventIdState = useSetRecoilState(CurrentEventIdState);
    setCurrentEventIdState(eventId);

    const eventDescription = useRecoilValueLoadable(EventFullDescriptionFromId(eventId));

    useEffect(() => {
        if (widgetRef.current) {
            widgetRef.current.innerHTML = '';
        }
        // TODO: lanciato colo la prima volta, altrimenti re-render infinito
        if (parentDescriptionRef.current) {
            const elem = (parentDescriptionRef.current.querySelector(':nth-child(3)')?.previousElementSibling as any);
            if (elem) {
                elem.style = {
                    ...elem.style,
                    ...styles.parentDescriptionDivFirstchild
                };
            }
        }
        // Opzione 2
        (window as any).EBWidgets.createWidget({
            // Required
            widgetType: 'checkout',
            eventId: eventId,
            iframeContainerId: `eventbrite-widget-container-${eventId}`,

            // Optional
            iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
        });
    }, []);


    return (
        <div className='content box columns' style={ styles.container }>
            <div ref={ parentDescriptionRef } className='column'>
                <Suspense fallback={<h2 className="title">Loading...</h2>}>
                    <EventDetails eventId={ eventId } />
                </Suspense>
                { eventDescription.state === 'hasValue' ? eventDescription.contents :
                    <h2 className="title">{ eventDescription.state == 'loading' ? 'Loading...' : 'Error' }</h2>
                }
                <div ref={ widgetRef } id={ `eventbrite-widget-container-${eventId}` }></div>
            </div>
        </div>
    );
}