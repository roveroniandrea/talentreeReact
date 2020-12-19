import { useEffect, useState } from "react";
import FacebookPost from './facebookPost/FacebookPost';
import { EventData } from '../../core/eventbrite/EventbriteAPI';
import { useRecoilValueLoadable } from 'recoil';
import { OEmbedPostsStore } from '../../core/facebook/Facebook.store';
import { NextActivities } from '../../core/eventbrite/Eventbrite.store';
import { FacebookAPI } from '../../core/facebook/FacebookAPI';
import EventLink from '../../components/eventLink/EventLink';

export default function HomePage() {
    const [ facebookPostsContainer, setFacebookPostsContainer ] = useState<JSX.Element[]>([]);

    const nextActivities = useRecoilValueLoadable(NextActivities(true));

    const facebookPostsOEmbed = useRecoilValueLoadable(OEmbedPostsStore);

    const recentEvents = nextActivities.state === 'hasValue' ? nextActivities.contents.slice().sort((e1, e2) => e1.start.getTime() - e2.start.getTime()).slice(0, 5) : [];


    useEffect(() => {
        switch (facebookPostsOEmbed.state) {
            case 'hasValue': {
                // Initializing the ugly facebook sdk to render the loaded posts
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
                setFacebookPostsContainer([]);
                break;
            }
            case 'hasError': {
                setFacebookPostsContainer([ <h2 className="title" key="errorTitle">Error</h2> ]);
                break;
            }
        }
    }, [ facebookPostsOEmbed ]);

    const box = (
        <div className="box">
            <h1 className="title">Prossimi eventi</h1>
            { recentEvents.map((ev: EventData) => <EventLink event={ ev } />) }
        </div>
    );

    return (
        <div className="columns is-desktop" style={ ({ marginLeft: '10px', marginRight: '30px', marginTop: '20px' }) }>
            <div className="column is-hidden-tablet">
                { box }
            </div>
            <div className='column is-three-quarters' style={ ({ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }) }>
                <div>
                    { facebookPostsContainer }
                </div>
            </div>
            <div className="column is-hidden-mobile">
                { box }
            </div>
        </div>
    );
}