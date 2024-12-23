import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import {
  Container,
  Typography,
  Button,
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grow, // Import Grow for animation
} from "@material-ui/core";
import backgroundImage from "../IMG/bk.png"; // Import the background image
import MealNavBar from "../MealHome/MealNavBar";
import MealFooter from "../MealHome/MealFooter";

const useStyles = makeStyles((theme) => ({
  backHomeImg: {
    backgroundColor: "black", // Background color black
    minHeight: "100vh", // Ensure full height of the viewport
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  pageTitle: {
    color: "white",
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  addButton: {
    backgroundColor: "#f87f22",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    padding: theme.spacing(1, 4),
    marginBottom: theme.spacing(4),
    "&:hover": {
      backgroundColor: "#f87f2200",
    },
  },
  cardRoot: {
    maxWidth: 345,
    height: "100%", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    border: "1px solid #e0e0e0", 
    borderRadius: theme.spacing(1), 
    transition: "box-shadow 0.3s ease-in-out", 
    "&:hover": {
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)", 
    },
  },
  cardMedia: {
    height: 200, // Adjust height for full-size image display
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  cardText: {
    marginBottom: theme.spacing(1),
  },
  cardActions: {
    justifyContent: "space-between",
    borderTop: "1px solid #f0f0f0",
    paddingTop: theme.spacing(1),
  },
  publishButton: {
    backgroundColor: "#f87f22",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#f87f2200",
    },
  },
  tags: {
    color: "#1976d2", // Change color to blue for tags
  },
  summaryContainer: {
    backgroundColor: "#151515e4",
    color: "white",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(1),
  },
}));

function MealDetails() {
  const classes = useStyles();
  const [mealplan, setMeal] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadMeal();
  }, []);

  const loadMeal = async () => {
    const result = await axios.get("http://localhost:8080/meelplan");
    setMeal(result.data);
  };

  const deleteMeal = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meelplan?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/meelplan/${id}`);
        loadMeal();
        alert("meelplan deleted successfully!");
      } catch (error) {
        console.error("Error deleting workout:", error);
        alert("An error occurred while deleting the meelplan.");
      }
    }
  };

  const handlePublish = async (id) => {
    const confirmPublish = window.confirm(
      "Are you sure you want to publish this meal plan?"
    );
    if (confirmPublish) {
      try {
        // Perform publish action here, such as updating a status or sending a request to the server
        alert("Meal plan published Under Constructions!");
      } catch (error) {
        console.error("Error publishing meal plan:", error);
        alert("An error occurred while publishing the meal plan.");
      }
    }
  };

  // Group meal plan data by category
  const mealByCategory = mealplan.reduce((acc, meal) => {
    acc[meal.category] = acc[meal.category] || [];
    acc[meal.category].push(meal);
    return acc;
  }, {});

  // Calculate the summary details
  const postCount = mealplan.length;
  const publishedCount = mealplan.filter((meel) => meel.info === "Yes").length;


  return (
    <div>
      <MealNavBar />
      <div className={classes.backHomeImg}>
        <Container>
          <div className={classes.summaryContainer}>
            <Typography variant="h4" gutterBottom>
              Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Posts: {postCount}
            </Typography>
            <Typography variant="body1">
              Published: {publishedCount}
            </Typography>
          </div>
          <Typography variant="h1" className={classes.pageTitle}>
            Your Meal Plan Details
          </Typography>
          <Button
            className={classes.addButton}
            component={Link}
            to="/addmeal"
          >
            Add New Meal
          </Button>
          {/* Render meal details by category */}
          {Object.keys(mealByCategory).map((category) => (
            <div key={category}>
              <Typography variant="h1" className={classes.pageTitle}>
                {category} Meals
              </Typography>
              <Grid container spacing={3}>
                {mealByCategory[category].map((meel) => (
                  <Grid item xs={12} sm={6} md={4} key={meel.id}>
                    <Grow in={true} timeout={500}>
                      {/* Wrap the Card in Grow for animation */}
                      <Card className={classes.cardRoot}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.cardMedia}
                            image={meel.imgurl}
                            title={meel.name}
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              className={classes.cardTitle}
                              variant="h5"
                              component="h2"
                            >
                              {meel.name}
                            </Typography>
                            <Typography
                              className={classes.cardText}
                              variant="body1"
                              component="p"
                            >
                              <strong>Recipe:</strong> {meel.recipe}
                            </Typography>
                            <Typography
                              className={classes.cardText}
                              variant="body1"
                              component="p"
                            >

                            <strong>Nutritional Information:</strong> {meel.nutri}
                            </Typography>
                            <Typography
                              className={classes.cardText}
                              variant="body1"
                              component="p"
                            >

                              
                              <strong>Portion Size:</strong> {meel.size}
                            </Typography>
                            <Typography
                              className={classes.cardText}
                              variant="body1"
                              component="p"
                            >
                              
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.cardActions}>
                          <Button
                            size="small"
                            color="primary"
                            component={Link}
                            to={`/updatemeal/${meel.id}`}
                          >
                            Update
                          </Button>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => deleteMeal(meel.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            className={classes.publishButton}
                            component={Link}
                            to={`/goingtopublish/${meel.id}`}
                          >
                            Publish
                          </Button>
                        </CardActions>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            className={classes.cardText}
                            variant="body1"
                            component="p"
                          >
                            <strong>Already Publish?:</strong> {meel.info}<br></br>
                            <strong></strong> {meel.date}
                          </Typography>
                          <Typography
                            className={classes.tags}
                            variant="body1"
                            component="p"
                          >
                            <strong></strong> {meel.tags}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Container>
      </div>
      <MealFooter />
    </div>
  );
}

export default MealDetails;
