import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/models/recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') private apiUrl: string
  ) {}

  update: boolean = false;

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipe`);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/recipe/${id}`);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/recipe`, recipe);
  }

  editRecipe(recipe: Recipe, id: string): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/recipe/${id}`, recipe);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.apiUrl}/recipe/${id}`);
  }
}
