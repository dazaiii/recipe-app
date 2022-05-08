import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
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
