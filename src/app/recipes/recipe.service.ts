import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    // Event:
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://imageresizer.static9.net.au/vgvJq5iRXqIq6AjOxmeRUS9MNIA=/1000x563/https%3A%2F%2Fprod.static9.net.au%2F_%2Fmedia%2F2016%2F09%2F09%2F11%2F11%2FPizza-Siciliana-eggplant-sausage-cherry-tomatoes.jpg',
            [
                new Ingredient('Sausages', 1),
                new Ingredient('Tomato', 2),
            ]),
        new Recipe('A Test Recipe',
        'This is simply a test',
        'https://www.peta.org/wp-content/uploads/2020/04/Blank-1200-x-600-1.jpg',
        [
                new Ingredient('Potatoes', 6),
                new Ingredient('Green beans', 2),
        ])
      ];
      constructor(private slService: ShoppingListService) {

      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList( ingredients: Ingredient[]) {
          this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1); // 1 element to remove. After removing, array need to be updated.
          this.recipesChanged.next(this.recipes.slice());
      }
}