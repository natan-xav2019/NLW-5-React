import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playlist: (List: Episode[], index: number) => void;
    SetPlayingState: (state: boolean) => void;
    TogglePlay: () => void;
    ToggleLoop: () => void;
    ToggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
    
    
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvider = {
  children: ReactNode;
}

export function PlayerContextProvider({ children } : PlayerContextProvider) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
  
    function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playlist(List: Episode[], index: number) {
      setEpisodeList(List);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
  
    function TogglePlay() {
      setIsPlaying(!isPlaying);
    }

    function ToggleLoop() {
      setIsLooping(!isLooping);
    }

    function ToggleShuffle() {
      setIsShuffling(!isShuffling);
    }
  
    function SetPlayingState(state: boolean) {
      setIsPlaying(state);
    }

    function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {
      if(isShuffling) {
        const nexRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

        setCurrentEpisodeIndex(nexRandomEpisodeIndex);
      } else if (hasNext) {
        setCurrentEpisodeIndex( currentEpisodeIndex + 1);
      }
    }

    function playPrevious() {
      if(hasPrevious)
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  
    return (
        <PlayerContext.Provider 
          value={{ 
            episodeList, 
            currentEpisodeIndex, 
            play, 
            playlist,
            playNext,
            playPrevious,
            isPlaying,
            isShuffling,
            ToggleLoop,
            TogglePlay,
            ToggleShuffle,
            SetPlayingState,
            hasPrevious,
            hasNext,
            isLooping,
            clearPlayerState,
          }}
        >
        {children}
        </PlayerContext.Provider>
            
    )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
} 