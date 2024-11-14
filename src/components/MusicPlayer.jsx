import React, { useState, useEffect, useRef } from 'react';
import songs from '../songs';

function MusicPlayer({ updateCurrentSong, currentSongIndex, setCurrentSongIndex }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].audio;
    if (isPlaying) {
      audioRef.current.play().catch(error => console.error('Audio playback error:', error));
    }
    updateCurrentSong(songs[currentSongIndex].title, songs[currentSongIndex].artist);
  }, [currentSongIndex]);

  const togglePlay = () => {
    setIsPlaying(prevIsPlaying => {
      if (prevIsPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error('Audio playback error:', error));
      }
      return !prevIsPlaying;
    });
  };

  const forward = () => {
    if (isPlaying) {
      audioRef.current.pause();
    }
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
  };

  const backward = () => {
    if (isPlaying) {
      audioRef.current.pause();
    }
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    }
    setCurrentSongIndex(newIndex);
  };

  return (
    <div className="music-player">
      <button className="play-pause button" onClick={togglePlay}>
        {isPlaying ? <span>⏸</span> : <span>▶️</span>}
      </button>
      <button className="backward button" onClick={backward}>
        ⏪
      </button>
      <button className="forward button" onClick={forward}>
        ⏩
      </button>
      <audio ref={audioRef} />
      <div className={`image ${isPlaying ? 'spinning-element' : ''}`}>
        <img src="R.png" alt="Description of image" />
      </div>
    </div>
  );
}

export default MusicPlayer;
