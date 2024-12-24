import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeServiceService } from '../../services/Recipe/recipe-service.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import {MatMenuModule} from '@angular/material/menu';
import { RecipeDetailDialogComponent } from '../recipe-detail-dialog/recipe-detail-dialog.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    MatMenuModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: any;
  userId: number | null = null; // Store user ID

  constructor(
    public dialog: MatDialog,
    private recipeService: RecipeServiceService,
    private cdr: ChangeDetectorRef,
    public authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userId = profile.id; // Get user ID from profile
        console.log("User ID:", this.userId);
      },
      error: (error) => {
        console.error('Error fetching user profile', error);
      },
    });
  }

  handleOpenEditRecipeForm() {
    this.dialog.open(UpdateRecipeFormComponent, { data: this.recipe });
  }

  handleDeleteRecipe() {
    this.recipeService.deleteRecipes(this.recipe.id).subscribe();
  }

  toggleLike(recipe: any) {
    if (this.userId === null) {
      console.error('User ID not found. User may not be logged in.');
      return;
    }

    console.log('Current Likes:', recipe.likes);
    const isLiked = recipe.likes.includes(this.userId); // Use userId instead of email
    if (isLiked) {
      recipe.likes = recipe.likes.filter((id: number) => id !== this.userId); // Remove like
    } else {
      recipe.likes.push(this.userId); // Add like
    }

    this.recipeService.likeRecipes(recipe.id).subscribe({
      next: (updatedRecipe: any) => {
        recipe.likes = updatedRecipe.likes; // Update the recipe with likes from the response
        this.cdr.markForCheck(); // Trigger change detection if needed
        console.log('Recipe like updated successfully', updatedRecipe);
      },
      error: (error: any) => {
        console.error('Error updating like status', error);
      }
    });
  }


  openRecipeDetailDialog(recipe: any): void {
    this.dialog.open(RecipeDetailDialogComponent, {
      data: { recipe },
      height: '600px',
      width: '500px',
    });
  }

  getAvatarColor(name: string): string {
    // Generate a color based on the ASCII value of the name's first letter
    const colors = [
      '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFC300', '#581845',
      '#1ABC9C', '#8E44AD', '#D35400', '#27AE60', '#2980B9', '#F1C40F',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }
  onHover(recipe: any): void {
    console.log('Hovered on recipe:', recipe.title);
  }
  
  onHoverLeave(recipe: any): void {
    console.log('Hover left for recipe:', recipe.title);
  }
  
}
