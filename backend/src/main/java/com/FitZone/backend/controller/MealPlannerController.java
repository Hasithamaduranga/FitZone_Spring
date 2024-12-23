package com.FitZone.backend.controller;

import com.FitZone.backend.exception.MealPlannerNotFoundException;
import com.FitZone.backend.model.MealPlannerModel;
import com.FitZone.backend.repository.MealPlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class MealPlannerController {
    @Autowired
    private MealPlannerRepository mealPlanRepository;

    @PostMapping("/meelplan")
    MealPlannerModel newmeelModel(@RequestBody MealPlannerModel newworkoutPlanModel){
        return mealPlanRepository.save(newworkoutPlanModel);
    }
    @GetMapping("/meelplan")
    List<MealPlannerModel> getAllWorkout(){
        return mealPlanRepository.findAll();
    }
    @GetMapping("/meelplan/{id}")
    MealPlannerModel getmeelplanId(@PathVariable Long id){
        return mealPlanRepository.findById(id)
                .orElseThrow(()->new MealPlannerNotFoundException(id));
    }
    @PutMapping("/meelplan/{id}")
    MealPlannerModel updatemeelplan(@RequestBody MealPlannerModel newMealPlanModel, @PathVariable Long id) {
        return mealPlanRepository.findById(id)
                .map(mealPlanModel -> {
                    mealPlanModel.setName(newMealPlanModel.getName());
                    mealPlanModel.setRecipe(newMealPlanModel.getRecipe());
                    mealPlanModel.setInfo(newMealPlanModel.getInfo());
                    mealPlanModel.setDate(newMealPlanModel.getDate());
                    mealPlanModel.setSize(newMealPlanModel.getSize());
                    mealPlanModel.setImgurl(newMealPlanModel.getImgurl());
                    mealPlanModel.setCategory(newMealPlanModel.getCategory());
                    mealPlanModel.setTags(newMealPlanModel.getTags());
                    mealPlanModel.setNutri(newMealPlanModel.getNutri());
                    return mealPlanRepository.save(mealPlanModel);
                }).orElseThrow(() -> new MealPlannerNotFoundException(id));
    }
    @DeleteMapping("/meelplan/{id}")
    String deletemeelplan(@PathVariable Long id){
        if (!mealPlanRepository.existsById(id)){
            throw new MealPlannerNotFoundException(id);
        }
        mealPlanRepository.deleteById(id);
        return "MealPlan with id "+id+ " Deleted ";
    }




    @GetMapping("/like/{id}")
    public ResponseEntity<MealPlannerModel> getLikeStatus(@PathVariable Long id) {
        MealPlannerModel meal = mealPlanRepository.findById(id)
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
        return ResponseEntity.ok(meal);
    }

    @PostMapping("/like/{id}")
    public ResponseEntity<?> likeMeal(@PathVariable Long id) {
        MealPlannerModel meal = mealPlanRepository.findById(id)
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
        meal.setLikes(meal.getLikes() + 1);
        mealPlanRepository.save(meal);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/dislike/{id}")
    public ResponseEntity<?> dislikeMeal(@PathVariable Long id) {
        MealPlannerModel meal = mealPlanRepository.findById(id)
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
        meal.setDislikes(meal.getDislikes() + 1);
        mealPlanRepository.save(meal);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/comments/{id}")
    ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody Map<String, String> requestBody) {
        String comment = requestBody.get("comment");
        MealPlannerModel meal = mealPlanRepository.findById(id)
                .orElseThrow(() -> new MealPlannerNotFoundException(id));
        meal.getComments().add(comment);
        mealPlanRepository.save(meal);
        return ResponseEntity.ok().build();
    }







}
