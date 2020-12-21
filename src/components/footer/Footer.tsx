import { FacebookAPI } from '../../core/facebook/FacebookAPI';
import { YoutubeAPI } from '../../core/youtube/YoutubeAPI';

export default function Footer() {
    return (
        <footer className="footer has-background-success">
            <div className="content has-text-centered">
                <p className="subtitle has-text-white" style={ ({ textAlign: 'start' }) }>© 2014-2020 by <strong className="has-text-white">Talentree</strong></p>
                <div className="buttons">
                    <a target="blank" href={FacebookAPI.getPageUrl()} className="button has-text-white" style={ ({ backgroundColor: '#3b5998', borderColor: 'transparent' }) }>
                        <span className="icon is-small">
                            <i className="fa fa-facebook"></i>
                        </span>
                        <span>Seguici su Facebook</span>
                    </a>
                    <a target="blank" href={ YoutubeAPI.getChannelUrl()} className="button has-text-white" style={ ({ backgroundColor: '#c4302b', borderColor: 'transparent' }) }>
                        <span className="icon is-small">
                            <i className="fa fa-youtube-play"></i>
                        </span>
                        <span>Seguici su Youtube</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}