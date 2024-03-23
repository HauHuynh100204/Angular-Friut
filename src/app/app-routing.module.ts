import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Trang Chủ' },
  { path: 'product-list', component: ProductListComponent, title: 'Danh Sách Sản Phẩm' },
  { path: 'product-details/:id', component: ProductDetailsComponent, title: 'Chi Tiết Sản Phẩm' },
  { path: 'cart', component: CartComponent, title: 'Giỏ Hàng' },
  { path: 'login', component: LoginComponent, title: 'Đăng Nhập' },
  { path: 'register', component: RegisterComponent, title: 'Đăng Ký' },
  { path: 'user-list', component: UserListComponent, title: 'Danh Sách Tài Khoản Khách Hàng' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
