import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from 'src/models/recipe.model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-recipe-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  searchForm = new FormControl('');

  filteredRecipes: Recipe[] = [];

  recipes: Recipe[] = [
    {
      _id: '1',
      name: 'danie1',
      preparationTimeInMinutes: 10,
      description: '',
      ingredients: [
        {
          _id: '1',
          name: 'skladnik1',
          quantity: '',
        },
      ],
    },
    {
      _id: '2',
      name: 'danie2',
      preparationTimeInMinutes: 10,
      description: '',
      ingredients: [
        {
          _id: '1',
          name: 'skladnik2',
          quantity: '',
        },
      ],
    },
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredRecipes = this.recipes;
  }

  ngAfterContentChecked() {
    this.search();
  }

  openDialog(): void {
    this.dialog.open(DeleteConfirmationDialogComponent);
  }

  search(): void {
    if (this.searchForm.value) {
      let searchedRecipe = this.searchForm.value.toLowerCase().trim();
      this.filteredRecipes = this.recipes.filter((recipe) => {
        return recipe.name.includes(searchedRecipe);
      });
    } else {
      this.filteredRecipes = this.recipes;
    }
  }
}
