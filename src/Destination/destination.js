import React from 'react';
import './destination.css';

class Place extends React.Component {
  render() {
    const places = [
      { name: 'RELIGIOUS', photo: '/image/category/religious.png', url: '/religious' },
      { name: 'HISTORICAL', photo: '/image/category/historical.jpg', url: '/historical' },
      { name: 'HIKING', photo: '/image/category/hiking.webp', url: '/hiking' },
      { name: 'PICNIC', photo: '/image/category/picnic.jpg', url: '/picnic' },
      { name: 'PARKS', photo: '/image/category/park.jpg', url: '/park' },
    ];

    return (
      <div>
        <div className="video-container">
          <video autoPlay muted loop>
            <source src="/video/background1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          {places.map((place, index) => (
            <a
              key={index}
              href={place.url}
              className="box"
              // Remove target="_blank" from here
              rel="noopener noreferrer"
            >
              <img src={place.photo} alt={place.name} />
              <div className="text">{place.name}</div>
            </a>
          ))}
        </div>
        <h1 className="heading">CHOOSE THE CATEGORIES</h1>
      </div>
    );
  }
}

export default Place;
