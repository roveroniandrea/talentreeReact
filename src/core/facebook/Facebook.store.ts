import { atom, selector } from 'recoil';
import { FacebookAPI, FacebookPostData } from './FacebookAPI';

export const FacebookPostsStore = atom<FacebookPostData[]>({
    key: 'FacebookPostsStore',
    default: selector({
        key: 'FacebookPostsStore/default',
        get: () => FacebookAPI.getFacebookPosts(),
    }),
});
