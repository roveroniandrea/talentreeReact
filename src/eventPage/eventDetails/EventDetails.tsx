import { CSSProperties } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { EventDataFromId } from '../../core/eventbrite/Eventbrite.store';
import { Utility } from '../../utility/Utility';

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

export default function EventDetails(props: { eventId: string; }) {
    const eventData = useRecoilValueLoadable(EventDataFromId(props.eventId));

    const aspectRatio = eventData.state ==='hasValue' ? eventData.contents.logo.width / eventData.contents.logo.height : 1;
    const maxWidth = 350;
    const maxHeigth = maxWidth / aspectRatio;


    return (
        <div style={ styles.parent }>
            <div className='box' style={ styles.containerBox }>
                { eventData.state === 'hasValue' ? <article className="media is-align-items-center">
                    <div className="media-left">
                        <figure className="image" style={ ({
                            width: eventData.contents.logo.width,
                            height: eventData.contents.logo.height,
                            maxWidth: `${maxWidth}px`,
                            maxHeight: `${maxHeigth}px`
                        }) }>
                            <img src={ eventData.contents.logo.url } alt="logoUrl" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p style={ styles.text }>
                                <strong>{ eventData.contents.eventName }</strong>
                                <br />
                                { Utility.formatDate(eventData.contents.start) }
                            </p>
                        </div>
                        <nav className="level is-mobile">
                            <div className="level-left">
                                <a target="blank" href={ `https://www.eventbrite.it/e/${eventData.contents.eventId}` } className="button is-link">
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