import { CSSProperties, useEffect, useState } from 'react';
import { EventBriteAPI, EventData } from '../../utility/EventbriteAPI';
import { Utility } from '../../utility/Utility';
interface EventDetailsProps {
    eventId: string;
}

const styles: {
    [ key: string ]: CSSProperties;
} = {
    parent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    containerBox: {
        display: 'flex',
        justifyContent: 'center',
        width: 'fit-content'
    },
    text: {
        fontSize: 'medium',
        fontWeight: 'normal'
    }
};

export default function EventDetails(props: EventDetailsProps) {
    const [ eventData, setEventData ] = useState<EventData>(null);

    useEffect(() => {
        EventBriteAPI.getEventById(props.eventId)
            .then(ev => setEventData(ev));
    });

    const aspectRatio = eventData ? eventData.logo.width / eventData.logo.height : 1;
    const maxWidth = 350;
    const maxHeigth = maxWidth / aspectRatio;


    return (
        <div style={ styles.parent }>
            <div className='box' style={ styles.containerBox }>
                { eventData ? <article className="media is-align-items-center">
                    <div className="media-left">
                        <figure className="image" style={ ({
                            width: eventData.logo.width,
                            height: eventData.logo.height,
                            maxWidth: `${maxWidth}px`,
                            maxHeight: `${maxHeigth}px`
                        }) }>
                            <img src={ eventData.logo.url } alt="logoUrl" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p style={ styles.text }>
                                <strong>{ eventData.eventName }</strong>
                                <br />
                                { Utility.formatDate(eventData.start) }
                            </p>
                        </div>
                        <nav className="level is-mobile">
                            <div className="level-left">
                                <a target="blank" href={ `https://www.eventbrite.it/e/${eventData.eventId}` } className="button is-link">
                                    <span>Vai su Eventbrite</span>
                                    <span className="icon is-small">
                                        <i className="fa fa-external-link"></i>
                                    </span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </article> : null }
            </div>
        </div>
    );
}