import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private baseUrl = environment.backendApiUrl.replace(/\/$/, ""); // Remove trailing slash if present

  constructor(private http: HttpClient) {}

  authSubject = new BehaviorSubject<any>({
    user: null,
  });

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, userData);
  }

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
    return this.http
      .get<any>(`${this.baseUrl}/api/user/profile`, { headers })
      .pipe(
        tap((user) => {
          console.log('get user profile ', user);
          const currerntState = this.authSubject.value;
          this.authSubject.next({ ...currerntState, user });
        })
      );
  }
  logout() {
    localStorage.clear(); // Clear all local storage items
    this.authSubject.next({}); // Emit null to indicate no user is logged in
  }

  // getCurrentUserId(): number | null {
  //   const token = localStorage.getItem('token');  // or sessionStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decodedToken: any = jwtDecode(token);
  //       return decodedToken.userId;  // Assuming your JWT contains userId in the payload
  //     } catch (error) {
  //       console.error('Error decoding token', error);
  //       return null;
  //     }
  //   }
  //   return null;  // Return null if token doesn't exist
  // }

  getCurrentUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);

        // Return email from the token
        return decodedToken.email || null;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null; // Return null if token doesn't exist
  }
}
