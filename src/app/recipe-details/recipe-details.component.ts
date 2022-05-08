import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, ReplaySubject, Subscription, timer } from 'rxjs';
import { Recipe } from 'src/models/recipe.model';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;

  routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private recipeService: RecipeService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.getRecipeById(params['id']);
    });
  }

  openDialog(): void {
    if (this.recipe) {
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
      dialogRef.componentInstance.recipeId = this.recipe._id;
    }
  }

  getRecipeById(_id: string): void {
    this.recipeService.getRecipeById(_id).subscribe((recipe) => {
      this.recipe = recipe;
      this.changeDetector.detectChanges();
    });
  }
}
