import { atom, selector } from 'recoil';
import { YoutubeAPI } from './YoutubeAPI';

/** All the lyoutube video's id */
export const YoutubeVideosState = atom<string[]>({
    key: 'youtubeVideosState',
    default: selector({
        key: 'youtubeVideosState/default',
        get: () => YoutubeAPI.loadYoutubeVideos()
    }),
});
