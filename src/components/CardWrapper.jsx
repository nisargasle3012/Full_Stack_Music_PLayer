import React from 'react';
import Card from './Card';
import '../styles/Cardwrapper.css';

function CardWrapper({ contact, updateCurrentSong, setCurrentSongIndex, songIndex }) {
  const handleCardClick = () => {
    setCurrentSongIndex(songIndex);
    updateCurrentSong(contact.name, contact.artist);
  };

  return (
    <div className="card-wrapper" onClick={handleCardClick}>
      <Card song_name={contact.name} song_artist={contact.artist} />
    </div>
  );
}

export default CardWrapper;
