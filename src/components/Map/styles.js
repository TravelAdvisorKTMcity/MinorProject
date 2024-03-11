import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '90vh', width: '100%',
    position: 'relative',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },

  modeSelection: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: '1000',
  },
  modeButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
  },
  removeDirectionsButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    zIndex: '1000',
  },
  modeButton: {
    padding: '10px 20px',
    borderRadius: '20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
  },
  selectedModeButton: {
    backgroundColor: '#000000', // Black when selected
  },  

  calculateButton: {
    borderRadius: '30px', // Rounded corners
    padding: '10px 20px', // Padding
    color: 'white', // Text color
    backgroundColor: 'blue', // Default background color
    border: 'none', // No border
    cursor: 'pointer', // Cursor on hover
  },

    
  weatherButton: {
    borderRadius: '30px', // Rounded corners
    padding: '10px 20px', // Padding
    textAlign: '5px',
    height: '35px',
    color: 'white', // Text color
    backgroundColor: 'blue', // Default background color
    border: 'none', // No border
    cursor: 'pointer', // Cursor on hover
  },

}));
