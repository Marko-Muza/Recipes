import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { typeWithParameters } from "@angular/compiler/src/render3/util";

@Injectable({providedIn: 'root'}) // Because we inject service into service. I can use this shortcut {providedIn: 'root'} or i can provided it in app.module.ts
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-fb329-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http
        .get<Recipe[]>('https://ng-recipe-book-fb329-default-rtdb.firebaseio.com/recipes.json',
        {
            params: new HttpParams().set('auth', user.token)
        });
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        );
    }
}