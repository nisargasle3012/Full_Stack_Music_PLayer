import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';
import CardWrapper from '../components/CardWrapper';
import songs from '../songs';
import '../styles/Home.css';
import { useAuth } from '../hooks/useAuth'; // Import useAuth

function Home() {
  const [currentSong, setCurrentSong] = useState({
    title: songs[0].title,
    artist: songs[0].artist,
  });
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Destructure from context

  const updateCurrentSong = (title, artist) => {
    setCurrentSong({ title, artist });
  };

  const handleLogout = () => {
    setUser(null); // Clear user from context
    navigate('/'); // Redirect to login
  };

  return (
    <div className="container">

      {/* Left: Song Cards */}
      <div className="left">
        {songs.map((song, index) => (
          <CardWrapper
            key={index}
            contact={{ name: song.title, artist: song.artist }}
            updateCurrentSong={updateCurrentSong}
            setCurrentSongIndex={setCurrentSongIndex}
            songIndex={index}
          />
        ))}
      </div>

      {/* Right: Player */}
      <div className="right">
        <MusicPlayer
          updateCurrentSong={updateCurrentSong}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
        />
        <span className='user_name'>
          Welcome, {user?.name} 🎵
        </span>
        <Link className='profile_link'>
          Profile
        </Link>
        <button className='logout_btn' onClick={handleLogout}>
          Logout
        </button>
        <div className="player-name">Geet Music Player</div>
        <div className="song_name">
          <h1>{currentSong.title}</h1>
          <p>{currentSong.artist}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
