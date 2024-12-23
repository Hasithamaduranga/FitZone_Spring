import React from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";
//Workout Status
import WorkoutDetails from "./Components/WorkoutStatus/WorkoutsDetails/WorkoutDetails";
import AddWorkout from "./Components/WorkoutStatus/AddWorkouts/AddWorkouts";
import UpdateWorkout from "./Components/WorkoutStatus/UpdateWorkouts/UpdateWorkouts";
import StatusHome from "./Components/WorkoutStatus/StatusHome/StatusHome";
//Meal Planer
import MealDetails from "./Components/MealPlanner/MealDetails/MealDetails";
import AddMeal from "./Components/MealPlanner/AddMeal/AddMeal";
import UpdateMeal from "./Components/MealPlanner/UpdateMeal/UpdateMeal";
import MealHome from "./Components/MealPlanner/MealHome/MealHome";
import MealFooter from "./Components/MealPlanner/MealHome/MealFooter";
//Publish Meal Plans
import PublishMeal from "./Components/MealPlanner/Publish/PublishMeal";
import Published from "./Components/MealPlanner/Publish/PublishedPlans";
import AddPost from "./Components/UploadePost/AddPost/AddPost";
import PostDetails from "./Components/UploadePost/PostDetails/PostDetails";
import PublishPost from "./Components/WorkoutStatus/PublishPost/PublishPost";
import WorkoutPostHome from "./Components/WorkoutStatus/WorkoutPostHome/WorkoutPostHome";
import Register from "./Components/Auth/Register/Register";
import Login from "./Components/Auth/Login/Login";
import WorkoutPlanDetails from "./Components/WorkoutPlan/WorkoutsDetails/WorkoutDetails";
import AddWorkoutPlan from "./Components/WorkoutPlan/AddWorkouts/AddWorkouts";
import UpdateWorkoutPlan from "./Components/WorkoutPlan/UpdateWorkouts/UpdateWorkouts";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/regi" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/*Workout Status*/}
          <Route path="/workoutdetails" element={<WorkoutDetails />} />
          <Route path="/addworkout" element={<AddWorkout />} />
          <Route path="/statushome" element={<StatusHome />} />
          <Route path="/updateworkout/:id" element={<UpdateWorkout />} />
          <Route path="/posthome" element={<WorkoutPostHome />} />
          <Route path="/publishwork/:id" element={<PublishPost />} />
          {/*Meal Planner*/}
          <Route path="/meal-home" element={<MealHome />} />
          <Route path="/meal-footer" element={<MealFooter />} />
          <Route path="/mealdetails" element={<MealDetails />} />
          <Route path="/addmeal" element={<AddMeal />} />
          <Route path="/updatemeal/:id" element={<UpdateMeal />} />
          {/*Publish Meal Plans*/}
          <Route path="/goingtopublish/:id" element={<PublishMeal />} />
          <Route path="/published" element={<Published />} />
          {/*Post*/}
          <Route path="/post" element={<AddPost />} />
          <Route path="/postdetails" element={<PostDetails />} />
          {/*workout plane */}
          <Route path="/planeworkouthome" element={<WorkoutPlanDetails />} />
          <Route path="/addworkoutplN" element={<AddWorkoutPlan />} />
          <Route path="/updateworkoutplan/:id" element={<UpdateWorkoutPlan />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
