import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { useState } from 'react';

import { playerContainer } from '../Contexts/PlayerContext';

import '../styles/global.scss'
import styles from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function TogglePlay() {
    setIsPlaying(!isPlaying);
  }

  function SetPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return (
    <playerContainer.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, TogglePlay, SetPlayingState}}>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </playerContainer.Provider>
  );
}

export default MyApp;
