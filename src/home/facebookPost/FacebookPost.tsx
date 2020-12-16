import { Component } from "react";
import { FacebookAPI, FacebookPostData } from '../../utility/FacebookAPI';

interface FacebookPostProps {
    post: FacebookPostData;
}
export default class FacebookPost extends Component<FacebookPostProps> {
    render() {
        let src = `https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/permalink.php?story_fbid=${this.props.post.getPostId()}%26id=${this.props.post.getPageId()}&show_text=true&width=552&appId=${FacebookAPI.getAppId()}&height=384`;
        return (
            <div style={ ({ margin: '5%' }) }>
                <iframe title={ this.props.post.fullId } src={ src } width="552" height="384" style={ ({ border: 'none', overflow: 'hidden' }) } scrolling="no" frameBorder="0" allowFullScreen={ true } allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>
            </div>
        );
    }
}