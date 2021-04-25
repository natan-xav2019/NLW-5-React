import { createContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContexData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    SetPlayingState: (state: boolean) => void;
    TogglePlay: () => void;
};

export const playerContainer = createContext({} as PlayerContexData);