import { createRef, CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router";
import { EventBriteAPI } from '../utility/EventbriteAPI';
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
    const [ eventFullDescription, setEventFullDescription ] = useState<JSX.Element>(<h1>Loading...</h1>);
    const widgetRef = createRef<HTMLDivElement>();
    const parentDescriptionRef = createRef<HTMLDivElement>();
    const { eventId } = useParams<{ eventId: string; }>();

    const getDescription = () => {
        setEventFullDescription(<h1>Loading...</h1>);
        //Opzione 3
        EventBriteAPI.getEventFullDescription(eventId)
            .then(desc => setEventFullDescription(desc));
    };

    useEffect(() => {
        if (widgetRef.current) {
            widgetRef.current.innerHTML = '';
        }
        // TODO: lanciato colo la prima volta, altrimenti re-render infinito
        if (parentDescriptionRef.current) {
            const elem = (parentDescriptionRef.current.querySelector(':nth-child(3)')?.previousElementSibling as any);
            console.log(parentDescriptionRef.current, elem);
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
        getDescription();
    }, []);


    return (
        <div className='content box columns' style={ styles.container }>
            <div ref={ parentDescriptionRef } className='column'>
                <EventDetails eventId={ eventId } />
                { eventFullDescription }
                <div ref={ widgetRef } id={ `eventbrite-widget-container-${eventId}` }></div>
            </div>
        </div>
    );
}