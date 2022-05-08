import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RecipeListComponent } from './recipe-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      imports: [MatDialogModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(
      dialogRefSpyObj
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
