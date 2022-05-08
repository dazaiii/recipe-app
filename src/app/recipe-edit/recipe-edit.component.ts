import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
    ]),
    preparationTimeInMinutes: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(255),
    ]),
    ingredients: new FormArray([], [Validators.minLength(2)]),
  });

  routeSub: Subscription = new Subscription();

  defaultIngredientsAmount: number = 2;

  recipe: Recipe | undefined;

  get name() {
    return this.recipeForm.get('name');
  }

  get preparationTimeInMinutes() {
    return this.recipeForm.get('preparationTimeInMinutes');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientsControls() {
    const array = this.ingredients;
    return array.controls as FormGroup[];
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.routeSub = this.route.params.subscribe((params) => {
        this.getRecipeById(params['id']);
      });
    } else if (this.router.url.includes('add')) {
      this.addMinimumIngredients();
    }
  }

  submit(): void {
    if (this.router.url.includes('add')) {
      this.addRecipe(this.recipeForm.value);
    } else if (this.router.url.includes('edit')) {
      if (this.recipe) {
        this.editRecipe(this.recipeForm.value, this.recipe._id);
      }
    }
    this.cancel();
    this.recipeService.update = true;
  }

  cancel(): void {
    this.recipeForm.reset();
    this.ingredients.clear();
    this.addMinimumIngredients();
  }

  addIngredient(name?: string, quantity?: string): void {
    const ingredientForm = this.fb.group({
      name: new FormControl(name ? name : '', [Validators.required]),
      quantity: new FormControl(quantity ? quantity : '', [
        Validators.required,
      ]),
    });
    this.ingredients.push(ingredientForm);
  }

  deleteIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  addMinimumIngredients(): void {
    for (let i = 0; i < this.defaultIngredientsAmount; i += 1) {
      this.addIngredient();
    }
  }

  getRecipeById(_id: string): void {
    this.recipeService.getRecipeById(_id).subscribe((recipe) => {
      this.recipe = recipe;
      this.name?.reset(recipe.name);
      this.description?.reset(recipe.description);
      this.preparationTimeInMinutes?.reset(recipe.preparationTimeInMinutes);
      this.ingredients.reset([]);
      recipe.ingredients.forEach((ingredient) => {
        this.addIngredient(ingredient.name, ingredient.quantity);
      });
      this.changeDetector.detectChanges();
    });
  }

  addRecipe(recipe: Recipe): void {
    this.recipeService
      .addRecipe(recipe)
      .subscribe(() => this.snackBar.open('Success', 'Close'));
  }

  editRecipe(recipe: Recipe, _id: string): void {
    this.recipeService
      .editRecipe(recipe, _id)
      .subscribe(() => this.snackBar.open('Success', 'Close'));
  }
}
