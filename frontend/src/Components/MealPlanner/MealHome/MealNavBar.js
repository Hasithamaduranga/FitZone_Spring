import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom
import ArrowBackIcon from '@material-ui/icons/ArrowBack'; // Import ArrowBackIcon for the menu button

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#151515',
  },
  menuButton: {
    paddingLeft: '80px',
    marginRight: theme.spacing(2),
    color: '#F87F22', // Set color to #F87F22 for the icon
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '15px',
    color: '#F87F22', // Set font color to #F87F22
  },
  navButton: {
    
    color: '#F87F22', // Set font color to #F87F22
  },
}));

export default function MealNavBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          component={RouterLink}
          to="/Published"
        >
          <ArrowBackIcon /> {/* Use ArrowBackIcon instead of MenuIcon */}
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          NutriPlanningPro
        </Typography>
        <div style={ { paddingRight: '100px'}  }>
        <Button color="inherit" component={RouterLink} to="/addmeal" className={classes.navButton}>
          Create New NutriPlan
        </Button>
        <Button color="inherit" component={RouterLink} to="/mealdetails" className={classes.navButton}>
          View My NutriPlans
        </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
