import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'recipe-app';

  recipeId: string = '';

  setRecipeId(_id: string) {
    this.recipeId = _id;
    console.log(this.recipeId, _id);
  }
}
