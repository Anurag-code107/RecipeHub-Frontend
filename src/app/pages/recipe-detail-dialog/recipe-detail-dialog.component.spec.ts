import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailDialogComponent } from './recipe-detail-dialog.component';

describe('RecipeDetailDialogComponent', () => {
  let component: RecipeDetailDialogComponent;
  let fixture: ComponentFixture<RecipeDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
