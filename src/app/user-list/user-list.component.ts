import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input() userList: Users[] = [];
  formUser = new FormGroup({
    // id: new FormControl<number>(1),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });
  constructor(private prod: UserService) {
    prod.getAllUserList().subscribe(data => {
      this.userList = data;
    })
  }
  ngOnInit(): void {
    this.prod.getAllUserList().subscribe((data) => {
      this.userList = data;
    });
  }
  IsAdd: number = 1;
  IsUpdate: number = 0;
  Add() {
    // this.formProduct.controls['id'].setValue(this.autoId())
    this.prod.AddUser(this.formUser.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
      this.resetForm()
    })
  }
  // On file Select
  id: any
  Edit(index: number) {
    this.id = this.userList[index].id
    this.formUser.controls['email'].setValue(this.userList[index].email)
    this.formUser.controls['password'].setValue(this.userList[index].password)
  }
  Update() {
    this.prod.UpdateUser(this.id, this.formUser.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
      this.resetForm()
    })
  }
  Delete(index: number) {
    this.id = this.userList[index].id
    this.prod.DeleteUser(this.id).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }
  resetForm() {
    this.formUser.controls['email'].setValue('')
    this.formUser.controls['password'].setValue('')
  }
}
