import { FacebookAPI, FacebookPostData } from '../../core/facebook/FacebookAPI';

interface FacebookPostProps {
    post: FacebookPostData;
}

export default function FacebookPost(props: FacebookPostProps) {
    let src = `https://www.facebook.com/plugins/post.php?href=https://www.facebook.com/permalink.php?story_fbid=${props.post.getPostId()}%26id=${props.post.getPageId()}&show_text=true&width=552&appId=${FacebookAPI.getAppId()}&height=384`;
    return (
        <div style={ ({ margin: '5%' }) }>
            <iframe title={ props.post.fullId } src={ src } width="552" height="384" style={ ({ border: 'none', overflow: 'hidden' }) } scrolling="no" frameBorder="0" allowFullScreen={ true } allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>
        </div>
    );
}