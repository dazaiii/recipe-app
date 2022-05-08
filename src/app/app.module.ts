import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorDialogComponent } from './author-dialog/author-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ConvertMinutesToHoursPipe } from './convert-minutes-to-hours.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecipeInterceptor } from './recipe-interceptor';
import { environment } from 'src/environments/environment';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthorDialogComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    DeleteConfirmationDialogComponent,
    RecipeEditComponent,
    ConvertMinutesToHoursPipe,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterTestingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RecipeInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: 'BASE_API_URL',
      useValue: environment.baseUrl,
    },
    MatDialogModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
