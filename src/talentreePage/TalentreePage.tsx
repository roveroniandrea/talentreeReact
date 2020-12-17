import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { EventBriteAPI, EventData } from '../core/eventbrite/EventbriteAPI';
import { Utility } from '../utility/Utility';

export default function TalentreePage() {
    const [ talentreeEvents, setTalentreeEvents ] = useState<EventData[]>([]);

    const history = useHistory();

    useEffect(() => {
        EventBriteAPI.getTalentreeEvents()
            .then(events => setTalentreeEvents(events));
    }, []);

    return (
        <Fragment>
            { talentreeEvents.map((ev: EventData) => (
                        <div className={ "button is-large " } key={ ev.eventId } onClick={ () => Utility.navigateToEvent(ev, history) }>
                            <div className="block">
                                <p className="title is-4">{ ev.eventName }</p>
                                <p className="subtitle is-6">{ Utility.formatDate(ev.start) }</p>
                            </div>
                        </div>
                    )) }
        </Fragment>
    );
}