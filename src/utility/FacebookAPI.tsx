import Axios from 'axios';

/** Stores the data for a single Facebook post*/
export class FacebookPostData {
    readonly date: Date;
    readonly fullId: string;
    readonly message: string;

    constructor(fullId: string, date: Date, message: string) {
        this.date = date;
        this.fullId = fullId;
        this.message = message;
    }

    getPageId() {
        return this.fullId.slice(0, this.fullId.indexOf('_'));
    }

    getPostId() {
        return this.fullId.slice((this.fullId.indexOf('_') + 1));
    }
}

export class FacebookAPI{
    private static facebookEndpoint = 'https://graph.facebook.com/v9.0';

    /** Returns all the facebook posts */
    static getFacebookPosts(): Promise<FacebookPostData[]> {
        return Axios.get(`${this.facebookEndpoint}/${process.env.REACT_APP_FACEBOOK_PAGE_ID}/feed?method=get&pretty=0&sdk=joey&suppress_http_code=1&access_token=${process.env.REACT_APP_FACEBOOK_ACCESS_TOKEN}`)
            .then((response: { data: { data: { id: string; creation_time: Date; message: string; }[]; }; }) => {
                if (response.data.data) {
                    return (response.data.data.map(((d: { id: string; creation_time: Date; message: string; }) => new FacebookPostData(d.id, d.creation_time, d.message))));
                }
                else {
                    throw new Error('No posts returned');
                }
            });
    }

    /** Returns the Facebook app id */
    static getAppId() {
        return process.env.REACT_APP_FACEBOOK_APP_ID;
    }
}