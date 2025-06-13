import React, { useState, useEffect, useRef } from 'react';
import songs from '../songs';

function MusicPlayer({ updateCurrentSong, currentSongIndex, setCurrentSongIndex }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.src = songs[currentSongIndex].audio;
    if (isPlaying) {
      audioRef.current.play().catch(error => console.error('Audio playback error:', error));
    }
    updateCurrentSong(songs[currentSongIndex].title, songs[currentSongIndex].artist);
  }, [currentSongIndex]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

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
    setProgress(0);
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
    setProgress(0);
  };

  useEffect(() => {
    const audio1 = audioRef.current;

    const handleEnded = () => {
      forward();
    };

    setProgress(0);

    audio1.addEventListener('ended', handleEnded);

    return () => {
      audio1.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    const seekTime = (value / 100) * audio.duration;
    audio.currentTime = seekTime;
    setProgress(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioRef.current;
      if (isPlaying && audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration); 
        const currentProgress = (audio.currentTime / audio.duration) * 100;
        setProgress(currentProgress);
      }
    }, 1); // update every 0.5 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);


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
      <input
        type="range"
        className="slider"
        value={progress}
        min="0"
        max="100"
        onChange={handleSeek}
      />
      <div className="time-display">
        <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
      </div>

      <audio ref={audioRef} />
      <div className={`image ${isPlaying ? 'spinning-element' : ''}`}>
        <img src="R.png" alt="Description of image" />
      </div>
    </div>
  );
}

export default MusicPlayer;
