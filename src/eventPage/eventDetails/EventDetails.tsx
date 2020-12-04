import { Component } from 'react';
import { EventBriteAPI, EventData } from '../../utility/EventbriteAPI';
import { Utility } from '../../utility/Utility';
import styles from './EventDetails.module.css';

interface EventDetailsProps {
    eventId: string;
}

interface EventDetailsState {
    eventData: EventData;
}
export class EventDetails extends Component<EventDetailsProps, EventDetailsState> {

    constructor(props: EventDetailsProps | Readonly<EventDetailsProps>) {
        super(props);
        this.state = {
            eventData: null
        };
    }

    componentDidMount() {
        this.getEventDetails();
    }

    componentDidUpdate(prevProps: EventDetailsProps | Readonly<EventDetailsProps>, _prevState: EventDetailsState) {
        if (this.props.eventId !== prevProps.eventId) {
            this.getEventDetails();
        }
    }

    render() {
        const aspectRatio = this.state.eventData ? this.state.eventData.logo.width / this.state.eventData.logo.height : 1;
        const maxWidth = 350;
        const maxHeigth = maxWidth / aspectRatio;
        return (
            <div className={ styles.parent }>
                <div className={ 'box ' + styles.containerBox }>
                    { this.state.eventData ? <article className="media is-align-items-center">
                        <div className="media-left">
                            <figure className="image" style={ ({
                                width: this.state.eventData.logo.width,
                                height: this.state.eventData.logo.height,
                                maxWidth: `${maxWidth}px`,
                                maxHeight: `${maxHeigth}px`
                            }) }>
                                <img src={ this.state.eventData.logo.url } alt="logoUrl" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p className={ styles.text }>
                                    <strong>{ this.state.eventData.eventName }</strong>
                                    <br />
                                    { Utility.formatDate(this.state.eventData.start) }
                                </p>
                            </div>
                            <nav className="level is-mobile">
                                <div className="level-left">
                                    <a target="blank" href={ `https://www.eventbrite.it/e/${this.state.eventData.eventId}` } className="button is-link">
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

    private getEventDetails() {
        EventBriteAPI.getEventById(this.props.eventId)
            .then(ev => this.setState({
                eventData: ev
            }));
    }
}