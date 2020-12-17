import { Fragment } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { YoutubeVideosState } from '../core/youtube/Youtube.store';

export default function YoutubeVideos() {

    const youtubeVideosLoadable = useRecoilValueLoadable(YoutubeVideosState);

    switch (youtubeVideosLoadable.state){
        case 'hasValue': {
            return (
                <Fragment>
                    {youtubeVideosLoadable.contents.map(id => {
                        return <iframe title={ id } key={ id } width="560" height="315" src={ `https://www.youtube.com/embed/${id}` } frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
                    }) }
                </Fragment>
            );
        }
        case 'loading': {
            return <h2 className="title">Loading...</h2>
        }
        case 'hasError': {
            return <h2 className="title">Errore: {youtubeVideosLoadable.errorOrThrow.toString()}</h2>
        }
    }
    
}