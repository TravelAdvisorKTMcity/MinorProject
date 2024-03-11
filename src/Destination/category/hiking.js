import React from 'react';

class Hik extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByValley: 'All', // Default value to display all destinations
    };
  }

  handleSortChange = (event) => {
    this.setState({ sortByValley: event.target.value });
  };

  render() {
    const places = [
      { name: 'Nagarkot', valley: 'Kathmandu', photo: '/image/hiking/nagarkot.jpg', url: '/nagarkot' },
      { name: 'Champadevi', valley: 'Kathmandu', photo: '/image/hiking/champadevi.webp', url: 'https://maps.app.goo.gl/pqMaoTm8esdAGZsL7' },
      { name: 'Shivapuri National Park', valley: 'Kathmandu', photo: '/image/hiking/shivapuri.jpg', url: 'https://maps.app.goo.gl/zM6DSzcvXhmq5w7U8' },
      { name: 'Dhaap Dam', valley: 'Lalitpur', photo: '/image/hiking/dhaap.jpg', url: 'https://maps.app.goo.gl/8Hf2sXHe2x5su2219' },
    ];

    // Filter places based on sortByValley state
    const filteredPlaces = this.state.sortByValley === 'All' ? places : places.filter(place => place.valley === this.state.sortByValley);

    // Sort places array by name
    filteredPlaces.sort((a, b) => a.name.localeCompare(b.name));

    // Get unique valley options
    const valleyOptions = [...new Set(places.map(place => place.valley))];
    valleyOptions.unshift('All'); // Add 'All' option

    return (
      <div>
        <div className="sort-container">
          <label htmlFor="valleySort">Sort by Valley:</label>
          <select id="valleySort" value={this.state.sortByValley} onChange={this.handleSortChange}>
            {valleyOptions.map((valley, index) => (
              <option key={index} value={valley}>{valley}</option>
            ))}
          </select>
        </div>
        <div className="video-container">
          <video autoPlay muted loop>
            <source src="/video/background1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          {filteredPlaces.map((place, index) => (
            <a key={index} href={place.url} className="box" rel="noopener noreferrer">
              <img src={place.photo} alt={place.name} />
              <div className="text">{place.name}</div>
            </a>
          ))}
        </div>
        <h1 className="heading">HIKING DESTINATIONS</h1>
      </div>
    );
  }
}

export default Hik;
