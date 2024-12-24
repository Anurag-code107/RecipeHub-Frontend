import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-recipe-form',
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
  templateUrl: './update-recipe-form.component.html',
  styleUrl: './update-recipe-form.component.scss',
})
export class UpdateRecipeFormComponent {
  recipeItem: any = {
    title: '',
    description: '',
    category: '',
    image: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: any,
    private recipeService: RecipeServiceService,
    private dialogRef: MatDialogRef<UpdateRecipeFormComponent> // MatDialogRef to close the dialog
  ) {}

  onSubmit() {
    // Update recipe
    this.recipeService.updateRecipes(this.recipeItem).subscribe({
      next: (data) => {
        console.log('Updated successfully', data);
        this.dialogRef.close(); // Close the dialog after successful update
      },
      error: (error) => console.log('Error while updating recipe', error),
    });
    console.log('Updated values:', this.recipeItem);
  }

  ngOnInit() {
    // Initialize recipeItem with the recipe data passed from the dialog
    this.recipeItem = { ...this.recipe }; // Using spread operator to avoid direct mutation
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
