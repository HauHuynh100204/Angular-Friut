import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lab10_2';
  constructor(private authService: AuthService) { }
  isAuthenticated() {
    return this.authService.ngOnInit();
  }
  logout() {
    if (confirm('Bạn có muốn đăng xuất không?')) {
      this.authService.logout();
    }
  }
}
