import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Comment from "./Comment";
import { Add } from "@material-ui/icons";

import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grow,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import {
  Search,
  ThumbUp,
  ThumbDown,
  Share,
} from "@material-ui/icons";
import { CardActions } from "@material-ui/core";
import MealNavBar from "../MealHome/MealNavBar";
import MealFooter from "../MealHome/MealFooter";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardRoot: {
    width: 400,
  },
  cardMedia: {
    height: 350,
  },
  cardContent: {
    minHeight: 100,
  },
  tags: {
    marginTop: theme.spacing(2),
  },
  likeButton: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(0),
  },
  dislikeButton: {
    color: theme.palette.error.main,
  },
  profileButton: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f87f22",
    color: "black",
  },
  followIcon: {
    marginRight: theme.spacing(1),
    paddingTop: "-10px",
    paddingBottom: "10px",
    marginLeft: theme.spacing(40),
    marginTop: theme.spacing(-2),
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    paddingTop: "60px",
    paddingBottom: "40px",
  },
  searchInput: {
    width: "70%",
    marginRight: theme.spacing(2),
    marginLeft: "100px",
  },
  searchButton: {
    padding: theme.spacing(1),
    backgroundColor: "#f87f22",
  },
}));

function MealDetails() {
  const classes = useStyles();
  const [mealByCategory, setMealByCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  const [likeCounts, setLikeCounts] = useState({});
  const [postId, setPostId] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false); // Track visibility of comments

  useEffect(() => {
    loadMeal();
  }, []);

  const loadMeal = async () => {
    try {
      const result = await axios.get("http://localhost:8080/meelplan");
      const filteredMeals = result.data.filter((meal) => meal.info === "Yes");
      setMealByCategory(groupMealsByCategory(filteredMeals));

      const initialLikeCounts = {};
      filteredMeals.forEach((meal) => {
        initialLikeCounts[meal.id] = 0;
      });
      setLikeCounts(initialLikeCounts);
    } catch (error) {
      console.error("Error loading meals:", error);
    }
  };

  const groupMealsByCategory = (meals) => {
    return meals.reduce((acc, meal) => {
      acc[meal.category] = acc[meal.category] || [];
      acc[meal.category].push(meal);
      return acc;
    }, {});
  };

  const handleShare = (mealId) => {
    console.log(`Share meal with ID: ${mealId}`);
  };

  const handleViewProfile = (userId) => {
    console.log(`View profile for user ID: ${userId}`);
  };

  const handleFollow = (userId) => {
    console.log(`Follow user with ID: ${userId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const filteredMeals = Object.keys(mealByCategory).reduce((acc, category) => {
    acc[category] = mealByCategory[category].filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return acc;
  }, {});

  const handleLike = async (mealId) => {
    try {
      await axios.post(`http://localhost:8080/like/${mealId}`);
      const updatedMeal = await axios.get(
        `http://localhost:8080/meelplan/${mealId}`
      );
      const updatedLikeCounts = {
        ...likeCounts,
        [mealId]: updatedMeal.data.likes,
      };
      window.location.reload();
      setLikeCounts(updatedLikeCounts);
    } catch (error) {
      console.error("Error liking meal:", error);
    }
  };

  const handleDislike = async (mealId) => {
    try {
      await axios.post(`http://localhost:8080/dislike/${mealId}`);
      const updatedMeal = await axios.get(
        `http://localhost:8080/meelplan/${mealId}`
      );
      const updatedLikeCounts = {
        ...likeCounts,
        [mealId]: updatedMeal.data.likes,
      };
      window.location.reload();
      setLikeCounts(updatedLikeCounts);
    } catch (error) {
      console.error("Error disliking meal:", error);
    }
  };

  

  function highlightMatchedLetters(name) {
    const matchStart = name.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (matchStart === -1) return name;

    const matchEnd = matchStart + searchTerm.length;
    const beforeMatch = name.substring(0, matchStart);
    const match = name.substring(matchStart, matchEnd);
    const afterMatch = name.substring(matchEnd);
    return (
      <>
        {beforeMatch}
        <span style={{ backgroundColor: "#ffcc80" }}>{match}</span>
        {afterMatch}
      </>
    );
  }

  return (
    <div>
      <MealNavBar />
      <Container>
        <div className={classes.searchContainer}>
          <br />
          <br />
          <TextField
            className={classes.searchInput}
            label="Search by name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClearSearch}>
                  <Search />
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.searchButton}
            onClick={handleClearSearch}
          >
            Clear Search
          </Button>
        </div>
        {Object.keys(filteredMeals).map((category) => (
          <div key={category}>
            <Typography variant="h5" className={classes.pageTitle}>
              {category} Meals
            </Typography>
            <Grid container spacing={3}>
              {filteredMeals[category].map((meal) => (
                <Grid item xs={12} sm={6} md={4} key={meal.id}>
                  <Grow in={true} timeout={500}>
                    <Card className={classes.cardRoot}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.cardMedia}
                          component="img"
                          alt={meal.name}
                          image={meal.imgurl}
                          title={meal.name}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography variant="h5" component="h2" gutterBottom>
                            {highlightMatchedLetters(meal.name)}
                          </Typography>
                          <Typography
                            variant="body1"
                            component="p"
                            gutterBottom
                          >
                            <strong>Recipe:</strong>{" "}
                            {meal.recipe.length > 100
                              ? `${meal.recipe.substring(0, 100)}... `
                              : meal.recipe}
                            {meal.recipe.length > 100 && (
                              <Button
                                color="primary"
                                size="small"
                                onClick={() => {
                                  // Handle "See more" click
                                  console.log("See more clicked for recipe");
                                }}
                              >
                                See more
                              </Button>
                            )}
                          </Typography>
                          <Typography
                            variant="body1"
                            component="p"
                            className={classes.tags}
                          >
                            <strong>Nutritional Information:</strong>{" "}
                            {meal.nutri}
                          </Typography>
                          <Typography
                            className={classes.cardText}
                            variant="body1"
                            component="p"
                          >
                            <strong>Date:</strong> {meal.date}
                          </Typography>
                          <Typography
                            variant="body1"
                            component="p"
                            className={classes.tags}
                          >
                            {meal.tags}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <IconButton
                          className={classes.likeButton}
                          onClick={() => handleLike(meal.id)}
                        >
                          <ThumbUp />
                        </IconButton>
                        <IconButton
                          className={classes.dislikeButton}
                          onClick={() => handleDislike(meal.id)}
                        >
                          <ThumbDown />
                        </IconButton>

                        <Typography variant="body1" component="p">
                          Likes: {meal.likes} | Dislikes: {meal.dislikes}
                        </Typography>

                        <IconButton onClick={() => handleShare(meal.id)}>
                          <Share />
                        </IconButton>
                      </CardActions>
                      <CardActions>
                        <IconButton onClick={handleToggleComments}>
                          <Button
                            variant="contained"
                            color="orange"
                            startIcon={<Add />}
                          >
                            {showComments ? "Hide " : "Add Comments"}
                          </Button>
                        </IconButton>
                      </CardActions>
                      {showComments && (
                        <CardContent>
                          <Comment
                            postId={meal.id}
                            setPostId={setPostId}
                            setComments={setComments}
                          />
                        </CardContent>
                      )}
                      <CardActions>
                        <IconButton>
                         
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </Container>
      <MealFooter />
    </div>
  );
}

export default MealDetails;
