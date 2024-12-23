import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  makeStyles,
  Select,
  MenuItem,
  TextareaAutosize,
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import {
  DateRange,
  Image,
  Label,
  Description,
  Category,
} from "@material-ui/icons";
import NavBar from "../MealHome/MealNavBar";
import MealFooter from "../MealHome/MealFooter";

const useStyles = makeStyles((theme) => ({
  formBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    minHeight: "calc(100vh - 64px)",
    padding: theme.spacing(3),
  },
  form: {
    width: "100%",
    maxWidth: "600px",
    padding: theme.spacing(3),
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(2),
    background: "white",
  },
  formTitle: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#f87f22",
    color: "white",
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#f87f2200",
    },
  },
}));

function AddMeal() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [mealplan, setMeal] = useState({
    name: "",
    recipe: "",
    info: "",
    size: "",
    date: "",
    imgurl: "",
    category: "",
    tags: "",
    nutri: "",
  });

  const { name, recipe, info, size, date, imgurl, category, tags,nutri } = mealplan;

  const onInputChange = (e) => {
    setMeal({ ...mealplan, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/meelplan", mealplan);
    alert("Meal Plan uploaded successfully");
    navigate("/mealdetails");
  };

  return (
    <div>
      <NavBar />
      <Box className={classes.formBox}>
        <form onSubmit={(e) => onSubmit(e)} className={classes.form}>
          <Typography variant="h4" className={classes.formTitle}>
            Add New Meal Plan
          </Typography>


          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="imgurl">Image Url</InputLabel>
            <OutlinedInput
              id="imgurl"
              value={imgurl}
              onChange={(e) => onInputChange(e)}
              name="imgurl"
              required
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Image />
                </InputAdornment>
              }
            />
          </FormControl>



          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="name">Name</InputLabel>
            <OutlinedInput
              id="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              name="name"
              required
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Label />
                </InputAdornment>
              }
            />
          </FormControl>


          <FormControl className={classes.formControl} variant="outlined">
      <InputLabel htmlFor="size">Select Portion Size</InputLabel>
      <Select
        id="size"
        value={size}
        onChange={(e) => onInputChange(e)}
        name="size"
        fullWidth
        startAdornment={
          <InputAdornment position="start">
           
          </InputAdornment>
        }
      >
        <MenuItem value="Small">Small</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Large">Large</MenuItem>
      </Select>
          </FormControl>


          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              id="category"
              value={category}
              onChange={(e) => onInputChange(e)}
              name="category"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Category />
                </InputAdornment>
              }
            >
    
              <MenuItem value="">Select Meal Category</MenuItem>
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
              <MenuItem value="Pescatarian">Pescatarian</MenuItem>
              <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
              <MenuItem value="Dairy-Free">Dairy-Free</MenuItem>
              <MenuItem value="Keto">Keto (Ketogenic)</MenuItem>
              <MenuItem value="Paleo">Paleo</MenuItem>
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Desserts">Desserts</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="recipe">Recipe</InputLabel>
            <TextareaAutosize
              id="recipe"
              rowsMin={3}
              placeholder="Enter recipe"
              value={recipe}
              onChange={(e) => onInputChange(e)}
              name="recipe"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="nutri">Nutritional Information</InputLabel>
            <OutlinedInput
              id="nutri"
              value={nutri}
              onChange={(e) => onInputChange(e)}
              name="nutri"
              required
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              }
            />
          </FormControl>

          
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="date">Date</InputLabel>
            <OutlinedInput
              id="date"
              type="date"
              value={date}
              onChange={(e) => onInputChange(e)}
              name="date"
              required
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <DateRange />
                </InputAdornment>
              }
            />
          </FormControl>

          
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="info">Already Publish?</InputLabel>
            <Select
              id="info"
              value={info}
              onChange={(e) => onInputChange(e)}
              name="info"
              required
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              }
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>




          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="tags">Tags</InputLabel>
            <TextareaAutosize
              id="tags"
              rowsMin={3}
              placeholder="Enter tags"
              value={tags}
              onChange={(e) => onInputChange(e)}
              name="tags"
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Label />
                </InputAdornment>
              }
            />
          </FormControl>


         

          <Button
            type="submit"
            className={classes.submitButton}
            fullWidth
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Box>
      <MealFooter />
    </div>
  );
}

export default AddMeal;
