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
  Switch, // Import Switch for toggling
} from "@material-ui/core";
import { DateRange, Image, Label, Description, Category } from "@material-ui/icons";
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
  });
  const { name, recipe, info, size, date, imgurl, category, tags } = mealplan;

  const onInputChange = (e) => {
    setMeal({ ...mealplan, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/meelplan/${id}`, mealplan);
    alert("Meal Plan Published Successfully");
    navigate("/published");
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
              Are you going to publish yoy meal plan?
            </Typography>
            
          <FormControl className={classes.formControl} variant="outlined">
  <InputLabel htmlFor="info">Are You going to Publish?</InputLabel>
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
         
         
            <Button
              type="submit"
              className={classes.submitButton}
              fullWidth
              variant="contained"
            >
              Publish
            </Button>
           
          </form>
         
        </div>
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      </Container>
      <MealFooter />
    </div>
  );
}

export default UpdateMeal;
