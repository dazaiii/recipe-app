import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, timer } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  searchForm = new FormControl('');

  recipes: Recipe[] = [];

  recipesEmitter$ = new BehaviorSubject<Recipe[]>(this.recipes);

  constructor(public dialog: MatDialog, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getRecipes();
    timer(1000, 1000).subscribe(() => {
      if (this.recipeService.update === true) {
        this.getRecipes();
        this.recipeService.update = false;
      }
    });
  }

  ngAfterContentChecked(): void {
    this.search();
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.recipesEmitter$.next(this.recipes);
    });
  }

  openDialog(_id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.componentInstance.recipeId = _id;
  }

  search(): void {
    if (this.searchForm.value && this.searchForm.value !== '') {
      let searchedRecipe = this.searchForm.value.toLowerCase().trim();
      this.recipesEmitter$.next(
        this.recipes.filter((recipe) => {
          return (
            recipe.name.includes(searchedRecipe) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.name.includes(searchedRecipe)
            )
          );
        })
      );
    } else {
      this.recipesEmitter$.next(this.recipes);
    }
  }
}
