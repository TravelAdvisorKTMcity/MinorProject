import React from 'react';

class Rel extends React.Component {
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
      { name: 'Boudhanath Stupa', valley: 'Kathmandu', photo: '/image/religious/boudhanath.jpg', url: 'https://maps.app.goo.gl/czYy3BNQTt9MK5696' },
      { name: 'Swayambhunath Stupa', valley: 'Kathmandu', photo: '/image/religious/swayambhunath.jpg', url: 'https://maps.app.goo.gl/Tw4iDqi487oSLMNG8' },
      { name: 'Pashupatinath Temple', valley: 'Kathmandu', photo: '/image/religious/pashupatinath.jpg', url: 'https://maps.app.goo.gl/AN8P8akyhHbrN2Zd7' },
      { name: 'Changunarayan', valley: 'Kathmandu', photo: '/image/religious/changunarayan.jpg', url: 'https://maps.app.goo.gl/a4Pgh5maKqGfiXu49' },
      { name: 'Valeshwor Mahadev', valley: 'Kathmandu', photo: '/image/religious/valeshwor.jpg', url: 'https://maps.app.goo.gl/REUvRJZqhjZzqNRy5' },
      { name: 'Boudhanath Stupa', valley: 'Kathmandu', photo: '/image/religious/boudhanath.jpg', url: 'https://maps.app.goo.gl/czYy3BNQTt9MK5696' },
      { name: 'Swayambhunath Stupa', valley: 'Kathmandu', photo: '/image/religious/swayambhunath.jpg', url: 'https://maps.app.goo.gl/Tw4iDqi487oSLMNG8' },
      { name: 'Pashupatinath Temple', valley: 'Kathmandu', photo: '/image/religious/pashupatinath.jpg', url: 'https://maps.app.goo.gl/AN8P8akyhHbrN2Zd7' },
      { name: 'Changunarayan', valley: 'Kathmandu', photo: '/image/religious/changunarayan.jpg', url: 'https://maps.app.goo.gl/a4Pgh5maKqGfiXu49' },
      { name: 'Valeshwor Mahadev', valley: 'Kathmandu', photo: '/image/religious/valeshwor.jpg', url: 'https://maps.app.goo.gl/REUvRJZqhjZzqNRy5' },
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
        <h1 className="heading">RELIGIOUS DESTINATIONS</h1>
      </div>
    );
  }
}

export default Rel;
