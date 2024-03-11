import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Button } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import mapStyles from '../../mapStyles';
import useStyles from './styles.js';
import axios from 'axios';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const [map, setMap] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [routeOptions, setRouteOptions] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);
  const [showCalculateButton, setShowCalculateButton] = useState(false); // State to control visibility of the "Calculate" button
  const [calculateButtonClicked, setCalculateButtonClicked] = useState(false);
  const [distanceAndTime, setDistanceAndTime] = useState(null); // State to store calculated distance and time
  const [travelMode, setTravelMode] = useState('DRIVING');
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      fetchWeatherInfo(selectedPlace.latitude, selectedPlace.longitude);
    }
  }, [selectedPlace]);

  const fetchWeatherInfo = async (latitude, longitude) => {
    const apiKey = 'f0f1aa512a213486e8ab51eeeef2ff83';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    
    try {
      const response = await axios.get(url);
      setWeatherInfo(response.data);
      setShowWeatherInfo(true);
    } catch (error) {
      console.error('Error fetching weather information:', error);
    }
  };

  useEffect(() => {
    if (directionsRenderer) {
      directionsRenderer.setMap(map);
    }
  }, [directionsRenderer, map]);

  const handleApiLoaded = (map, maps) => {
    if (map) {
      setMap(map);
      const trafficLayer = new maps.TrafficLayer();
      trafficLayer.setMap(map);
      const transitLayer = new maps.TransitLayer();
      transitLayer.setMap(map);
      // Create info window instance
    const newInfoWindow = new maps.InfoWindow();
    setInfoWindow(newInfoWindow);
    // Add click event listener to close info window when clicked on map
    map.addListener('click', handleMapClick);
  }
};

  const handleCardClick = (place) => {
    setSelectedPlace(place);
    calculateDirections(place);
    calculateDistanceTime(place); // Call calculateDistanceTime after calculateDirections
    setShowWeatherInfo(true); // Hide weather info when a new place card is selected
  };

  const calculateDistanceTime = (place) => {
    if (!userCoords || !place) return;

    const origin = new window.google.maps.LatLng(userCoords.lat, userCoords.lng);
    const destination = new window.google.maps.LatLng(Number(place.latitude), Number(place.longitude));
    const distanceMatrixService = new window.google.maps.DistanceMatrixService();

    distanceMatrixService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: travelMode,
        unitSystem: window.google.maps.UnitSystem.METRIC
      },
      (response, status) => {
        if (status === 'OK' && response.rows[0].elements[0].status !== 'ZERO_RESULTS') {
          const distance = response.rows[0].elements[0].distance.text;
          const duration = response.rows[0].elements[0].duration.text;
          // Update the routeOptions state with the distance and duration
          setRouteOptions([{ distance, duration }]);

          // Set distance and time for display in info window
          setDistanceAndTime({ distance, duration });
          // Show the "Calculate" button
          setShowCalculateButton(true);
          openInfoWindow(); // Call openInfoWindow after setting distance and time

        } else {
          console.error('Error calculating distance and duration:', status);
        }
      }
    );
  };

  const calculateDirections = (place) => {
    if (!userCoords || !place) return;

    const destination = {
      lat: Number(place.latitude),
      lng: Number(place.longitude)
  };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userCoords,
        destination: destination,
        travelMode: travelMode
      },
      (result, status) => {
        if (status === 'OK') {
          if (directionsRenderer) {
            directionsRenderer.setMap(null);
          }

          const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
          newDirectionsRenderer.setDirections(result);
          newDirectionsRenderer.setMap(map);
          setDirectionsRenderer(newDirectionsRenderer);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };


  const center = {
    lat: coords.lat,
    lng: coords.lng
  };


  const handleRemoveDirections = () => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
      setDirectionsRenderer(null);
      setShowCalculateButton(false);
      setShowWeatherInfo(false)
      setDistanceAndTime(null);
      setCalculateButtonClicked(true);
      handleWeatherInfoButtonClick(false);
    }
  };

  const handleModeChange = (mode) => {
    setTravelMode(mode);
    if (selectedPlace) {
      calculateDirections(selectedPlace);
    }
  };

  // Function to handle click on the map and close the info window
const handleMapClick = () => {
  if (infoWindow) {
    infoWindow.close();
  }
};

  // Define the function to handle click on the "Weather Info" button
  const handleWeatherInfoButtonClick = () => {
    if (selectedPlace && weatherInfo && infoWindow) {
      const contentString = `<div><p>Place: ${selectedPlace.name}</p><p>Temperature: ${weatherInfo.main.temp}°C</p><p>Humidity: ${weatherInfo.main.humidity}%</p><p>Condition: ${weatherInfo.weather[0].description}</p></div>`;
      infoWindow.setContent(contentString);
      infoWindow.setPosition({ lat: Number(selectedPlace.latitude), lng: Number(selectedPlace.longitude) }); // Set position to the selected place
      infoWindow.open(map);
    }
  };


    // Function to handle click on the "Calculate" button
    const handleCalculateButtonClick = () => {
      if (selectedPlace) {
        calculateDistanceTime(selectedPlace);
        setCalculateButtonClicked(true);
        if (distanceAndTime) {
          const contentString = `<div><p>Place: ${selectedPlace.name}</p><p>Distance: ${distanceAndTime.distance}</p><p>Duration: ${distanceAndTime.duration}</p></div>`;
          infoWindow.setContent(contentString);
          infoWindow.setPosition({ lat: Number(selectedPlace.latitude), lng: Number(selectedPlace.longitude) });
          infoWindow.open(map);
      }
    }
    };
  
    const openInfoWindow = () => {
      if (infoWindow && distanceAndTime) {
        let contentString = '';
        if (travelMode === 'DRIVING') {
          contentString = `<div><p>Place: ${selectedPlace.name}</p><p>Driving Duration: ${distanceAndTime.duration}</p><p>Distance: ${distanceAndTime.distance}</p></div>`;
        } else if (travelMode === 'WALKING') {
          contentString = `<div><p>Place: ${selectedPlace.name}</p><p>Walking Duration: ${distanceAndTime.duration}</p><p>Distance: ${distanceAndTime.distance}</p></div>`;
        }
        infoWindow.setContent(contentString);
        infoWindow.setPosition({
          lat: Number(selectedPlace.latitude),
          lng: Number(selectedPlace.longitude)
        });
        infoWindow.open(map);
      }
    };


  return (
    <div className={classes.mapContainer}>
      <div className={classes.modeSelection}>
        <button
          onClick={() => handleModeChange('DRIVING')}
          className={`${classes.modeButton} ${travelMode === 'DRIVING' ? classes.selectedModeButton : ''}`}
        >
          Driving
        </button>
        
        <button
          onClick={() => handleModeChange('WALKING')}
          className={`${classes.modeButton} ${travelMode === 'WALKING' ? classes.selectedModeButton : ''}`}
        >
          Walking
        </button>
      </div>
      <button onClick={handleRemoveDirections} className={classes.removeDirectionsButton}>Remove Directions</button>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAnpOyf0BJHoFi8nqvA2OMV1Kk8mCT88kU' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
       
      >
     
     {userCoords && (
        <div lat={userCoords.lat} lng={userCoords.lng}>
          <LocationOnOutlinedIcon color="primary" fontSize="large" />
        </div>
      )}
      
        {places && places.length > 0 && places.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
            onClick={() => handleCardClick(place)}
          >
            {!matches ? <LocationOnOutlinedIcon color="primary" fontSize="large" /> : (
              <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt={place.name}
                />
                <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

         {showCalculateButton && (
      <button
      onClick={handleCalculateButtonClick}
      className={classes.calculateButton}
    >
      Calculate
    </button>

      )}

{selectedPlace && (
  <Button
    onClick={handleWeatherInfoButtonClick}
    className={classes.weatherButton}
  >
    Weather
  </Button>
)}

      </GoogleMapReact>
     
    </div>
  );
};

export default Map;
