import { atom, selector } from 'recoil';
import { YoutubeAPI } from './YoutubeAPI';

export const YoutubeVideosState = atom<string[]>({
    key: 'youtubeVideosState',
    default: selector({
        key: 'youtubeVideosState/default',
        get: () => YoutubeAPI.loadYoutubeVideos()
    }),
});
