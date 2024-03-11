import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh', overflow: 'auto',
  },
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5', // Background color for the container
    borderRadius: '10px',
    marginBottom: '20px',
  },
  titleContainer: {
    backgroundColor: '#007bff', // Blue background color for the title
    color: '#ffffff', // White text color
    padding: '10px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
    marginBottom: '20px', // Space between form controls
  },
  list: {
    marginTop: '20px', // Space between the form controls and the list
  },
  attractionstitle: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif', // Change the font family to your desired font
    fontSize: '24px', // Adjust the font size as needed
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
  }  
}));
