import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (places && places.length) {
      const refs = Array(places.length).fill().map((_, i) => elRefs[i] || createRef());
      setElRefs(refs);
      
    }

  }, [places, elRefs]);

  const scrollToItem = (index) => {
    if (elRefs[index] && elRefs[index].current) {
      elRefs[index].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  return (
    <div className={classes.container}>
      {/* Attractions Near You Title */}
      <div className={classes.titleContainer}>
        <Typography variant="h4" className="attractionstitle">Attractions</Typography>
      </div>

      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          {/* Type Selector */}
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="attractions">Attractions</MenuItem>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
            </Select>
          </FormControl>

          {/* Rating Selector */}
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <div className={classes.container} style={{ maxHeight: '57vh', overflowY: 'auto' }}>
          <Grid container spacing={3} className={classes.list}>
            {places && places.map((place, index) => (
              <Grid item key={index} xs={12} ref={elRefs[index]}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={elRefs[index]}
                />
              </Grid>
            ))}
          </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
