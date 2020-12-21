import Axios from 'axios';

/** Stores the data for a single Facebook post*/
export class FacebookPostData {
    /** Creation date of the post */
    readonly date: Date;
    /** Full id composed as pageId_postId */
    readonly fullId: string;

    constructor(fullId: string, date: Date) {
        this.date = date;
        this.fullId = fullId;
    }

    /** Returns the id of the page's post */
    getPageId() {
        return this.fullId.slice(0, this.fullId.indexOf('_'));
    }

    /** Returns the id of the post */
    getPostId() {
        return this.fullId.slice((this.fullId.indexOf('_') + 1));
    }

    /** returns the complete url of the post */
    getUrl() {
        return `https://www.facebook.com/${this.getPageId()}/posts/${this.getPostId()}`;
    }
}

export class FacebookAPI {
    private static facebookEndpoint = 'https://graph.facebook.com/v9.0';

    /** Returns all the facebook posts */
    static getFacebookPosts(): Promise<FacebookPostData[]> {
        return Axios.get(`${this.facebookEndpoint}/${process.env.REACT_APP_FACEBOOK_PAGE_ID}/feed?method=get&pretty=0&sdk=joey&suppress_http_code=1`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`
            }
        }).then((response: { data: { data: { id: string; created_time: Date; }[]; }; }) => {
            if (response.data.data) {
                return (response.data.data.map(((d) => new FacebookPostData(d.id, new Date(d.created_time)))));
            }
            else {
                throw new Error('No posts returned');
            }
        });
    }

    /** Returns the JSX.Element of a single post */
    static getPostOEmbed(postUrl: string): Promise<JSX.Element> {
        return Axios.get(`${this.facebookEndpoint}/oembed_post?url=${postUrl}&omitscript=true`, {
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`
            }
        }).then(response => <div dangerouslySetInnerHTML={ ({ __html: response.data.html }) } />);
    }

    /** Return the url of the facebook page */
    static getPageUrl(): string {
        return `https://facebook.com/${process.env.REACT_APP_FACEBOOK_PAGE_ID}`;
    }

    /** Initializes the ugly facebook sdk to load the posts*/
    static renderOEmbedPosts() {
        // Initializing the ugly facebook sdk to render the loaded posts
        (window as any).FB.init({
            appId: process.env.REACT_APP_FACEBOOK_APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v9.0'
        });
    }
}