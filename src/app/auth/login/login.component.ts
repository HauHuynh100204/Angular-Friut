// import { Component } from '@angular/core';
// import { LoginForm } from '../auth';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   form: LoginForm = {
//     email: '',
//     password: ''
//   }
//   constructor(private authService: AuthService) { }
//   submit() {
//     this.authService.login(this.form)
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  submit() {
    this.authService.login(this.form).subscribe((loggedIn) => {
      if (loggedIn) {
        console.log('Login successful');
        this.router.navigate(['']); // Điều hướng đến trang chủ nếu đăng nhập thành công
      } else {
        console.log('Invalid email or password');
        // Xử lý lỗi đăng nhập không thành công (ví dụ: hiển thị thông báo lỗi)
      }
    });
  }
}
