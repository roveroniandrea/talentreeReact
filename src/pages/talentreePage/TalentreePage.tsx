import loadable from '@loadable/component';
import React, { Fragment } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { TalentreeEvents } from '../../core/eventbrite/Eventbrite.store';
import { EventData } from '../../core/eventbrite/EventbriteAPI';
const EventLink = loadable(() => import('../../components/eventLink/EventLink'));

export default function TalentreePage() {
    const talentreeEvents = useRecoilValueLoadable(TalentreeEvents);

    switch (talentreeEvents.state) {
        case 'hasValue': {
            return (
                <Fragment>
                    { talentreeEvents.contents.map((ev: EventData) => <EventLink key={ ev.eventId } event={ ev } />) }
                </Fragment>
            );
        }
        case 'loading': {
            return <h2 className="title">Loading...</h2>;
        }
        case 'hasError': {
            return <h2 className="title">Error</h2>;
        }
    }


}