import { Fragment, useEffect, useState } from 'react';
import { YoutubeAPI } from '../utility/YoutubeAPI';

export default function YoutubeVideos() {
    const [ videoIds, setVideoIds ] = useState<string[]>([]);

    useEffect(() => {
        YoutubeAPI.loadYoutubeVideos()
            .then(videoIds => setVideoIds(videoIds));
    }, []);

    return (
        <Fragment>
            {videoIds.map(id => {
                return <iframe title={ id } key={ id } width="560" height="315" src={ `https://www.youtube.com/embed/${id}` } frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
            }) }
        </Fragment>
    );
}