import { UserService } from './../../user.service';
import { Component } from '@angular/core';
import { RegisterForm } from '../auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    comfirm_password: '',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  submit() {
    const newUser = {
      email: this.form.email,
      password: this.form.password,
    };

    this.userService.AddUser(newUser).subscribe(
      response => {
        console.log('User registered successfully:', response);
        // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error registering user:', error);
        // this.toastr.error('Đã xảy ra lỗi khi đăng ký');
      }
    );
  }
}