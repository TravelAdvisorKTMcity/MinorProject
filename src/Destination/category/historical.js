import React from 'react';

class His extends React.Component {
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
      { name: 'Kathmandu Durbar Square', photo: '/image/historical/kathmandu.jpeg', url: 'https://maps.app.goo.gl/UjELcjwmZ5kRwmwX6', valley: 'Kathmandu' },
      { name: 'Patan Durbar Square', photo: '/image/historical/patan.jpg', url: 'https://maps.app.goo.gl/Tg3VX6qakKELG5m36', valley: 'Lalitpur' }, // Direct link to Google Maps
      { name: 'Bhaktapur Durbar Square', photo: '/image/historical/bhaktapur.jpg', url: '/hiking', valley: 'Kathmandu' },
      { name: 'Narayanhiti Palace', photo: '/image/historical/narayanhiti.jpeg', url: 'https://maps.app.goo.gl/9AQ95vEHdM3UWdNg7', valley: 'Kathmandu' },
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
        <h1 className="heading">HISTORICAL DESTINATIONS</h1>
      </div>
    );
  }
}

export default His;
