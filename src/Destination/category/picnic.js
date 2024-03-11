import React from 'react';

class Pic extends React.Component {
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
      { name: 'Godawori Botanical Garden', valley: 'Kathmandu', photo: '/image/picnic/godawori.jpg', url: 'https://maps.app.goo.gl/Ffniv1okPizF39b38' },
      { name: 'Chovar Hill', valley: 'Kathmandu', photo: '/image/picnic/chovar.jpg', url: 'https://maps.app.goo.gl/VaxomH5ezxx4TwyY8' },
      { name: 'Lakuri Bhanjyang', valley: 'Kathmandu', photo: '/image/picnic/lakuri.webp', url: 'https://maps.app.goo.gl/Mk7qVoJFQ5319ddt7' },
      { name: 'Kakani', valley: 'lalitpur', photo: '/image/picnic/kakani.jpg', url: 'https://maps.app.goo.gl/ScZDwKrC5HXuiyt88' },
      { name: 'Gundu', valley: 'Kathmandu', photo: '/image/picnic/gundu.webp', url: 'https://maps.app.goo.gl/ejfxEsVYVfvH41X3A' },
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
        <h1 className="heading">PICNIC DESTINATIONS</h1>
      </div>
    );
  }
}

export default Pic;
