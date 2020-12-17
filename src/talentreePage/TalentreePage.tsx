import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { TalentreeEvents } from '../core/eventbrite/Eventbrite.store';
import { EventData } from '../core/eventbrite/EventbriteAPI';
import { Utility } from '../utility/Utility';

export default function TalentreePage() {
    const talentreeEvents = useRecoilValueLoadable(TalentreeEvents);

    const history = useHistory();

    switch(talentreeEvents.state){
        case 'hasValue': {
            return (
                <Fragment>
                    { talentreeEvents.contents.map((ev: EventData) => (
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
        case 'loading': {
            return <h2 className="title">Loading...</h2>
        }
        case 'hasError': {
            return <h2 className="title">Error</h2>
        }
    }

    
}