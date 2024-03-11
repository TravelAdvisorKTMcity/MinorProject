import React from 'react';

class Park extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByValley: 'All', // Default value to display all destinations
    };
  }

  handleSortByValleyChange = (event) => {
    this.setState({ sortByValley: event.target.value });
  };

  render() {
    const places = [
      { name: 'Garden Of Dreams', valley: 'Kathmandu', photo: '/image/park/god.jpeg', url: 'https://maps.app.goo.gl/AgMUB6q2eonWWfgLA' },
      { name: 'Ratna Park', valley: 'Kathmandu', photo: '/image/park/ratnapark.webp', url: 'https://maps.app.goo.gl/7LAemxYQcsMAag7LA' },
      { name: 'Naxal Park', valley: 'Kathmandu', photo: '/image/park/naxal.jpeg', url: 'https://maps.app.goo.gl/GLmiRwj8F1jrYFWm8' },
      { name: 'Sankha Park', valley: 'Kathmandu', photo: '/image/park/sankha.jpeg', url: 'https://maps.app.goo.gl/GcjfjDsH9YZ1P6fB8' },
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
          <select id="valleySort" value={this.state.sortByValley} onChange={this.handleSortByValleyChange}>
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
        <h1 className="heading">PARK DESTINATIONS</h1>
      </div>
    );
  }
}

export default Park;
