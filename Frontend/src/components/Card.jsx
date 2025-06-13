// Card.jsx
import React from "react";
import '../styles/Card.css';

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.song_name}</h2>
      </div>
      <div className="bottom">
        <p className="info">{props.song_artist}</p>
      </div>
    </div>
  );
}

export default Card;
