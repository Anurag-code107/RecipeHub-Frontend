import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-detail-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './recipe-detail-dialog.component.html',
  styleUrl: './recipe-detail-dialog.component.scss'
})
export class RecipeDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RecipeDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recipe: any }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }


}
