import React, { Component, Fragment } from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EventBriteAPI, EventData } from '../utility/EventbriteAPI';
import { Utility } from '../utility/Utility';

interface TalentreePageState {
    talentreeEvents: EventData[];
}
class TalentreePage extends Component<RouteComponentProps, TalentreePageState> {

    constructor(props: RouteComponentProps<{}, StaticContext, unknown> | Readonly<RouteComponentProps<{}, StaticContext, unknown>>) {
        super(props);
        this.state = {
            talentreeEvents: []
        };
    }

    componentDidMount() {
        EventBriteAPI.getTalentreeEvents()
            .then(events => this.setState({
                talentreeEvents: events
            }));
    }

    render() {
        return (
            <Fragment>
                { this.state.talentreeEvents.map((ev: EventData) => (
                            <div className={ "button " } key={ ev.eventId } onClick={ () => Utility.navigateToEvent(ev, this.props.history) }>
                                <div className="block">
                                    <p className="title is-4">{ ev.eventName }</p>
                                    <p className="subtitle is-6">{ Utility.formatDate(ev.start) }</p>
                                </div>
                            </div>
                        )) }
            </Fragment>
        );
    }
}

export default withRouter(TalentreePage);