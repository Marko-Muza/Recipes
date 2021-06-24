import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'}) // Because we inject service into service. I can use this shortcut {providedIn: 'root'} or i can provided it in app.module.ts
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-fb329-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        })
    }
}