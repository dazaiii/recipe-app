import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  recipeId: string = '';

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId).subscribe(() => {
      this.recipeService.update = true;
      this.snackBar.open('Success', 'Close');
    });
  }
}
