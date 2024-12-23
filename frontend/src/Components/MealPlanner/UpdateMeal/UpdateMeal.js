import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
  pageBackground: {
    background: "black", // Background color black for the entire page
    minHeight: "100vh", // Ensures full viewport height
  },
  formBox: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: "800px",
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

function UpdateMeal() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/meelplan/${id}`, mealplan);
    alert("Meal Plan Updated Successfully");
    navigate("/mealdetails");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/meelplan/${id}`);
    setMeal(result.data);
  };

  return (
    <div className={classes.pageBackground}>
      <NavBar />
      <Container>
        <div className={classes.formBox}>
          <form onSubmit={(e) => onSubmit(e)} className={classes.form}>
            <Typography variant="h4" className={classes.formTitle}>
              Update Meal Plan
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
              <InputLabel htmlFor="size">Size</InputLabel>
              <Select
                id="size"
                value={size}
                onChange={(e) => onInputChange(e)}
                name="size"
                fullWidth
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
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
                <MenuItem value="">Select category</MenuItem>
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
              <InputLabel htmlFor="tags">Tags</InputLabel>
              <TextareaAutosize
                id="tags"
                rowsMin={3}
                
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
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="recipe">Recipe</InputLabel>
              <TextareaAutosize
                id="recipe"
                rowsMin={3}
               
                value={recipe}
                onChange={(e) => onInputChange(e)}
                name="recipe"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                  
                  </InputAdornment>
                }
              />
            </FormControl>

             <FormControl className={classes.formControl} variant="outlined">
              <InputLabel htmlFor="nutri">Nutritional Information</InputLabel>
              <TextareaAutosize
                id="nutri"
                rowsMin={3}
               
                value={nutri}
                onChange={(e) => onInputChange(e)}
                name="nutri"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
         
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
        </div>
      </Container>
      <MealFooter />
    </div>
  );
}

export default UpdateMeal;
