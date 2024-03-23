import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../user';
import { UserService } from '../user.service';
import { LoginForm, RegisterForm } from './auth';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  userId: string | undefined;
  isloading: boolean = false;
  users: Users[] = []
  constructor(private router: Router, private user: UserService) {
    user.getAllUserList().subscribe(data => {
      this.users = data;
    })
    this.ngOnInit()
  }

  // ngOnInit() {
  //   var loggedInUserString = localStorage.getItem('loggedInUser');

  //   if (loggedInUserString) {
  //     this.userId = localStorage.getItem('user_id') || undefined;
  //     // Có thông tin đăng nhập
  //     return true;
  //   } else {
  //     // Không có thông tin đăng nhập
  //     return false;
  //   }
  // }
  ngOnInit() {
    var loggedInUserString = localStorage.getItem('loggedInUser');

    if (loggedInUserString) {
      this.userId = localStorage.getItem('user_id') || undefined;
      // Có thông tin đăng nhập
      return true;
    } else {
      // Không có thông tin đăng nhập
      return false;
    }
  }
  // login(form: LoginForm) {
  //   this.users.forEach(element => {
  //     if (element.email == form.email) {
  //       if (element.password == form.password) {
  //         this.isAuthenticated = true;
  //         this.router.navigate(['']);
  //         this.userId = String(element.id);
  //         localStorage.setItem('loggedInUser', 'true');
  //         localStorage.setItem('user_id', String(this.userId))
  //       } else {
  //         alert('login not success');
  //         this.isAuthenticated = false;
  //       }
  //     }
  //   });
  // }
  login(form: LoginForm): Observable<boolean> {
    const foundUser = this.users.find(user => user.email === form.email && user.password === form.password);
    if (foundUser) {
      this.isAuthenticated = true;
      this.userId = String(foundUser.id);
      localStorage.setItem('loggedInUser', 'true');
      localStorage.setItem('user_id', String(this.userId))
      return of(true); // Trả về true nếu đăng nhập thành công
    } else {
      this.isAuthenticated = false;
      return of(false); // Trả về false nếu không tìm thấy người dùng hoặc thông tin đăng nhập không hợp lệ
    }
  }
  register(form: RegisterForm) {
    if (form.password != form.comfirm_password) {
      return;
    } else {
      this.user.AddUser({
        "email": form.email,
        "password": form.password
      })
      this.router.navigate(['login']);
    }
  }
  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('user_id');
    this.userId = undefined;
  }
}
