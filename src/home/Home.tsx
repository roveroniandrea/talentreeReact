import { CSSProperties, useEffect, useState } from "react";
import FacebookPost from './facebookPost/FacebookPost';
import { FacebookAPI, FacebookPostData } from '../utility/FacebookAPI';
import { EventBriteAPI, EventData } from '../utility/EventbriteAPI';
import { Utility } from '../utility/Utility';
import { useHistory } from 'react-router';

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
    const [ posts, setPosts ] = useState<FacebookPostData[]>([]);
    const [ recentEvents, setRecentEvents ] = useState<EventData[]>([]);

    useEffect(() => {
        FacebookAPI.getFacebookPosts()
            .then(posts => {
                setPosts(posts);
            });

        EventBriteAPI.getNextActivities()
            .then(events => {
                //TODO: controlla correttezza
                let nearest = events.sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
                setRecentEvents(nearest.slice(0, 5));
            });
    }, []);

    return (
        <div className="columns is-desktop">
            <div className='column is-three-quarters' style={ styles.columnPosts}>
                { posts.map(post => <FacebookPost key={ post.fullId } post={ post } />) }
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