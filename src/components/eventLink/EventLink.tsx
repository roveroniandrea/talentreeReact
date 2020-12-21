import { useHistory } from 'react-router-dom';
import { EventBriteAPI, EventData } from '../../core/eventbrite/EventbriteAPI';
import { Utility } from '../../utility/Utility';

export default function EventLink(props: { event: EventData; }) {
    const history = useHistory();

    return (
        <div className='button is-large' style={ ({ height: 'auto', width: 'auto', marginBottom: '5%', display: 'flex' }) } onClick={ () => EventBriteAPI.navigateToEvent(props.event, history) }>
            <div className="block">
                <p className="title is-4">{ props.event.eventName }</p>
                <p className="subtitle is-6">{ Utility.formatDate(props.event.start) }</p>
            </div>
        </div>
    );
}