import Axios from 'axios';

export class YoutubeAPI{

    private static youtubeEndpoint = 'https://www.googleapis.com/youtube/v3';
    
    /** Returns all the youtube videos */
    static loadYoutubeVideos(): Promise<string[]> {
        return Axios.get(`${this.youtubeEndpoint}/search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&channelId=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`)
            .then(res => {
                if (res.data.items) {
                    return res.data.items
                        .filter((item: { id: { kind: string; }; }) => item.id.kind === 'youtube#video')
                        .map((i: { id: { videoId: any; }; }) => i.id.videoId);
                }
                else {
                    throw new Error('No videos returned');
                }
            });
    }
}