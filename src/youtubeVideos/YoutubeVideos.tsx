import { Component, Fragment } from 'react';
import { Utility } from '../utility/Utility';

interface YoutubeVideosState {
    videoIds: string[];
}
export class YoutubeVideos extends Component<{}, YoutubeVideosState> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            videoIds: []
        };
    }

    componentDidMount() {
        Utility.loadYoutubeVideos()
            .then(videoIds => this.setState({ videoIds }));
    }

    render() {
        return (
            <Fragment>
                {this.state.videoIds.map(id => {
                    return <iframe title={ id } key={ id } width="560" height="315" src={ `https://www.youtube.com/embed/${id}` } frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />;
                }) }
            </Fragment>
        );
    }
}