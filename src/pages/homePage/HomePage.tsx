import { useEffect, useState } from "react";
import { EventData } from '../../core/eventbrite/EventbriteAPI';
import { useRecoilValueLoadable } from 'recoil';
import { OEmbedPostsStore } from '../../core/facebook/Facebook.store';
import { NextActivities } from '../../core/eventbrite/Eventbrite.store';
import { FacebookAPI } from '../../core/facebook/FacebookAPI';
import loadable from '@loadable/component';
const FacebookPost = loadable(() => import('./facebookPost/FacebookPost'));
const EventLink = loadable(() => import('../../components/eventLink/EventLink'));

export default function HomePage() {
    const [ facebookPostsContainer, setFacebookPostsContainer ] = useState<JSX.Element[]>([]);

    const nextActivities = useRecoilValueLoadable(NextActivities(true));

    const facebookPostsOEmbed = useRecoilValueLoadable(OEmbedPostsStore);

    const recentEvents = nextActivities.state === 'hasValue' ? nextActivities.contents.slice().sort((e1, e2) => e1.start.getTime() - e2.start.getTime()).slice(0, 5) : [];


    useEffect(() => {
        if (facebookPostsContainer.length > 0) {
            // FIXME: it seems that the only way to initialize the facebook posts is after some time they rendered
            // I could not find a hook that is called AFTER the facebookPostsContainer have been drawed
            setTimeout(() => {
                FacebookAPI.renderOEmbedPosts();
            }, 100);
        }
    }, [ facebookPostsContainer.length ]);

    useEffect(() => {
        switch (facebookPostsOEmbed.state) {
            case 'hasValue': {
                setFacebookPostsContainer(facebookPostsOEmbed.contents.map((oembed, index) => <FacebookPost key={ index } postOembed={ oembed } />));
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
            { recentEvents.map((ev: EventData) => <EventLink key={ ev.eventId } event={ ev } />) }
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