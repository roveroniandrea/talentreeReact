import { atom, selector, selectorFamily, waitForAll } from 'recoil';
import { FacebookAPI, FacebookPostData } from './FacebookAPI';

/** The atom containing all the facebook posts loaded */
const FacebookPostsStore = atom<FacebookPostData[]>({
    key: 'FacebookPostsStore',
    default: selector({
        key: 'FacebookPostsStore/default',
        get: () => FacebookAPI.getFacebookPosts(),
    }),
});

/** Returns the JSX.Element of an embedded post*/
const OEmbedSinglePostStore = selectorFamily<JSX.Element, string>({
    key: 'OEmbedSinglePostStore',
    get: (postUrl) => () => FacebookAPI.getPostOEmbed(postUrl),
});

/** Returns all the embedded posts loaded. Uses the `FacebookPostsStore` atom */
export const OEmbedPostsStore = selector<JSX.Element[]>({
    key: 'OEmbedPostsStore',
    get: ({ get }) => {
        let posts = get(FacebookPostsStore);
        return get(waitForAll(posts.map((post) => OEmbedSinglePostStore(post.getUrl()))));
    },
});
