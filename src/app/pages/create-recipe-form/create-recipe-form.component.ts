import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class CreateRecipeFormComponent {
  recipeItem: any = {
    title: '',
    description: '',
    category: '',
    instructions: '',
    image: '',
    ingredients: []
  };

  constructor(
    private recipeService: RecipeServiceService,
    private dialogRef: MatDialogRef<CreateRecipeFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (!this.recipeItem.title || !this.recipeItem.description || !this.recipeItem.category || !this.recipeItem.instructions) {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 3000 });
      return;
    }

    if (this.recipeItem.ingredients.some((ingredient: string) => !ingredient.trim())) {
      this.snackBar.open('Please fill out all ingredient fields.', 'Close', { duration: 3000 });
      return;
    }

    console.log('Recipe Data:', this.recipeItem);
    this.recipeService.createRecipe(this.recipeItem).subscribe({
      next: (data) => {
        this.snackBar.open(`Recipe "${this.recipeItem.title}" created successfully!`, 'Close', { duration: 3000 });
        this.resetForm();
        this.dialogRef.close();
      },
      error: (error) => {
        this.snackBar.open('Failed to create recipe. Try again.', 'Close', { duration: 3000 });
      },
    });
  }

  resetForm() {
    this.recipeItem = {
      title: '',
      description: '',
      category: '',
      instructions: '',
      image: '',
      ingredients: [],
    };
  }

  ngOnInit() {
    console.log(this.recipeItem);
  }
  

  addIngredient() {
    this.recipeItem.ingredients.push('');
  }

  removeIngredient(index: number) {
    this.recipeItem.ingredients.splice(index, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  
}
