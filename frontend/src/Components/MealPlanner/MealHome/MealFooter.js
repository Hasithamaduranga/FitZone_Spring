import React from 'react';
import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    textAlign: 'center',
  },
}));

const MealFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} NutriPlanningPro. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Made with love by{' '}
        <Link href="https://yourwebsite.com" color="inherit" target="_blank" rel="noopener noreferrer">
          Your Name
        </Link>
      </Typography>
    </footer>
  );
};

export default MealFooter;
