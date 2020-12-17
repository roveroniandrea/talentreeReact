import { CSSProperties, useEffect, useState } from "react";
import FacebookPost from './facebookPost/FacebookPost';
import { EventData } from '../core/eventbrite/EventbriteAPI';
import { Utility } from '../utility/Utility';
import { useHistory } from 'react-router';
import { useRecoilValueLoadable } from 'recoil';
import { OEmbedPostsStore } from '../core/facebook/Facebook.store';
import { NextActivities } from '../core/eventbrite/Eventbrite.store';
import { FacebookAPI } from '../core/facebook/FacebookAPI';

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
    const [ facebookPostsContainer, setFacebookPostsContainer ] = useState<JSX.Element[]>([]);

    const nextActivities = useRecoilValueLoadable(NextActivities);

    const facebookPostsOEmbed = useRecoilValueLoadable(OEmbedPostsStore);

    const recentEvents = nextActivities.state === 'hasValue' ? nextActivities.contents.slice().sort((e1, e2) => e1.start.getTime() - e2.start.getTime()).slice(0, 5) : [];


    useEffect(() => {
        switch (facebookPostsOEmbed.state) {
            case 'hasValue': {
                (window as any).FB.init({
                    appId: FacebookAPI.getAppId(),
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v9.0'
                });
                setFacebookPostsContainer(facebookPostsOEmbed.contents.map((oembed, index) => <FacebookPost key={ index } postOembed={ oembed } />));
                break;
            }
            case 'loading': {
                setFacebookPostsContainer([ <h2 className="title" key="loadingTitle">Loading...</h2> ]);
                break;
            }
            case 'hasError': {
                setFacebookPostsContainer([ <h2 className="title" key="errorTitle">Error</h2> ]);
                break;
            }
        }
    }, [ facebookPostsOEmbed.state ]);

    return (
        <div className="columns is-desktop">
            <div className='column is-three-quarters' style={ styles.columnPosts }>
                <div>
                    { facebookPostsContainer }
                </div>
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