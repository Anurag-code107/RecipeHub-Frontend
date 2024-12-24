import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: any = null;
  isMenuOpen = false;
  isMobile: boolean = window.innerWidth < 768;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }


  constructor(public authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.authService.authSubject.subscribe((auth) => {
      console.log('auth state ', auth);
      this.user = auth.user;
    });
  }

  handleLogOut() {
  this.authService.logout(); // Clear session/token
  this.user = null; // Reset the user in the component
  this.router.navigate(['/']); // Navigate to the home or login page
}

 // Adjust Layout on Window Resize
 @HostListener('window:resize', ['$event'])
 onResize(event: any) {
   this.isMobile = event.target.innerWidth < 768;
   if (!this.isMobile) {
     this.closeMenu(); // Close menu on switching back to web view
   }
 }

}
