import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink for navigation
import MealNavBar from './MealNavBar';
import MealFooter from './MealFooter';
import { Container, Typography, Button, Box, makeStyles } from '@material-ui/core';
import backgroundImage from '../IMG/bk.png'; // Import the background image

const useStyles = makeStyles((theme) => ({
  backHomeImg: {
    backgroundImage: `url(${backgroundImage})`, // Use the specified background image
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    backgroundSize: 'contain', // Ensure the entire image is visible without cropping
    height: '89.4vh',
    paddingTop: '64px', // Adjust the top padding to remove space
    display: 'flex',
    justifyContent: 'flex-end', // Align items to the end (right side)
  },
  contentHome: {
    color: 'white',
    fontSize: '75px',
    fontFamily: 'Jersey 10, sans-serif',
    fontWeight: 'bolder',
    textAlign: 'right', // Align the text to the right
    paddingRight: '6%', // Add right padding
  },
  startBtn: {
    backgroundColor: '#f87f22',
    color: 'white',
    fontSize: '25px',
    padding: '8px 25px',
    cursor: 'pointer',
    position: 'absolute',
    right: '-25px',
    borderRadius: '25px',
    marginRight: '12%',
    border: '2px solid #f87f22',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#f87f2200',
      color: '#f87f22',
    },
  },
  subtopic: {
    color: '#f87f22',
    margin: 0,
    padding: 0,
  },
  motivationText: {
    color: 'white',
    fontSize: '18px',
    marginTop: '20px',
    textAlign: 'center',
  },
}));

export default function MealHome() {
  const classes = useStyles();

  return (
    <div>
      <MealNavBar />
      <div className={classes.backHomeImg}>
        <Container>
          <Box mt={10}>
            <Typography variant="h1" className={classes.contentHome}>
              NutriPlanningPro
              <br />
              <i>
                <span className={classes.subtopic}>Home</span>
              </i>
            </Typography>
            <Button
              component={RouterLink}
              to="/published"
              variant="contained"
              color="primary"
              className={classes.startBtn}
            >
              Explore Shared Nutrie Plans
            </Button>
          </Box>
        </Container>
      </div>
      <MealFooter />
    </div>
  );
}
