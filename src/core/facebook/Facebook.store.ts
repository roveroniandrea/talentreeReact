import { atom, selector, selectorFamily, waitForAll } from 'recoil';
import { FacebookAPI, FacebookPostData } from './FacebookAPI';

export const FacebookPostsStore = atom<FacebookPostData[]>({
    key: 'FacebookPostsStore',
    default: selector({
        key: 'FacebookPostsStore/default',
        get: () => FacebookAPI.getFacebookPosts(),
    }),
});

const OEmbedSinglePostStore = selectorFamily<JSX.Element, string>({
    key: 'OEmbedSinglePostStore',
    get: (postUrl) => () => FacebookAPI.getPostOEmbed(postUrl),
});

export const OEmbedPostsStore = selector<JSX.Element[]>({
    key: 'OEmbedPostsStore',
    get: ({ get }) => {
        let posts = get(FacebookPostsStore);
        return get(waitForAll(posts.map((post) => OEmbedSinglePostStore(post.getUrl()))));
    },
});
