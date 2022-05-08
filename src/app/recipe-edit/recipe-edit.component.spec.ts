import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipe-edit.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
