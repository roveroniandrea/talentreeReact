import { createRef, useEffect } from 'react';

export default function EventIFrame(props: {eventId: string}){
    const widgetRef = createRef<HTMLDivElement>();

    useEffect(() => {
        if (widgetRef.current) {
            widgetRef.current.innerHTML = '';
        }
        
        // Opzione 2
        (window as any).EBWidgets.createWidget({
            // Required
            widgetType: 'checkout',
            eventId: props.eventId,
            iframeContainerId: `eventbrite-widget-container-${props.eventId}`,

            // Optional
            iframeContainerHeight: 425,  // Widget height in pixels. Defaults to a minimum of 425px if not provided
        });
    });

    return (
        <div ref={ widgetRef } id={ `eventbrite-widget-container-${props.eventId}` }></div>
    )
}