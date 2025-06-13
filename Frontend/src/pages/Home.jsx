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
      {/* Top Right Controls: Logout + Profile Link */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', padding: '10px' }}>
        <span style={{ alignSelf: 'center', marginRight: 'auto', fontWeight: 'bold' }}>
          Welcome, {user?.name} 🎵
        </span>

        <Link to="/profile" style={{ textDecoration: 'none', padding: '6px 12px', backgroundColor: '#ccc', borderRadius: '5px' }}>
          Go to Profile
        </Link>

        <button onClick={handleLogout} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

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
