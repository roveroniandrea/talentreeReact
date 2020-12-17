import { CSSProperties, useEffect, useState } from "react";
import FacebookPost from './facebookPost/FacebookPost';
import { EventBriteAPI, EventData } from '../core/eventbrite/EventbriteAPI';
import { Utility } from '../utility/Utility';
import { useHistory } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { FacebookPostsStore } from '../core/facebook/Facebook.store';

const styles: {
    [ elem: string ]: CSSProperties;
} = {
    columnPosts: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap' },
    eventDiv: {
        height: 'auto',
        width: 'auto',
        marginBottom: '5%',
    }
};

export default function Home() {

    const history = useHistory();
    const [ recentEvents, setRecentEvents ] = useState<EventData[]>([]);

    const facebookPosts = useRecoilValueLoadable(FacebookPostsStore);

    useEffect(() => {

        EventBriteAPI.getNextActivities()
            .then(events => {
                //TODO: controlla correttezza
                let nearest = events.sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
                setRecentEvents(nearest.slice(0, 5));
            });
    }, []);

    return (
        <div className="columns is-desktop">
            <div className='column is-three-quarters' style={ styles.columnPosts }>
                { facebookPosts.state == 'hasValue' ? facebookPosts.contents.map(post => <FacebookPost key={ post.fullId } post={ post } />) :
                    <h2 className="title">{ facebookPosts.state == 'loading' ? 'Loading...' : 'Error' }</h2> }
            </div>
            <div className="column">
                <div className="box">
                    <h1 className="title">Prossimi eventi</h1>
                    { recentEvents.map((ev: EventData) => (
                        <div className='button is-large' style={ styles.eventDiv } key={ ev.eventId } onClick={ () => Utility.navigateToEvent(ev, history) }>
                            <div className="block">
                                <p className="title is-4">{ ev.eventName }</p>
                                <p className="subtitle is-6">{ Utility.formatDate(ev.start) }</p>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}