import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

export function minLengthArray(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length >= min) {
      return null;
    }
    return { minLengthArray: { valid: false } };
  };
}

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
    preparation: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(255),
    ]),
    ingredients: new FormArray([], minLengthArray(2)),
  });

  routeSub: Subscription = new Subscription();

  defaultIngredientsNumber: number = 2;

  get name() {
    return this.recipeForm.get('name');
  }

  get preparation() {
    return this.recipeForm.get('preparation');
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

  get ingredientName() {
    return this.recipeForm.get('ingredients.name');
  }

  get quantityName() {
    return this.recipeForm.get('ingredients.quantity');
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params['id']);
    });
    this.addIngredient();
    this.addIngredient();
  }

  submit(): void {
    if (this.ingredients.hasError('minLengthArray')) {
      console.log('error');
    }
    console.log(this.recipeForm.value);
  }

  cancel(): void {}

  addIngredient() {
    const ingredientForm = this.fb.group({
      name: new FormControl(''),
      quantity: new FormControl(''),
    });
    this.ingredients.push(ingredientForm);
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
