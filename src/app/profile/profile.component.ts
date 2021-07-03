import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditing: boolean = false;
  profileForInput: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  ngOnInit(): void {
    this.profileForInput = {
      id: this.data.user.id,
      email: this.data.user.email,
      password: this.data.user.password,
      name: this.data.user.name,
      surname: this.data.user.surname,
      address: this.data.user.address
    };
  }

  finishEditing(form: NgForm): void {
    this.data.user.email = this.profileForInput.email;
    this.data.user.password = this.profileForInput.password;
    this.data.user.name = this.profileForInput.name;
    this.data.user.surname = this.profileForInput.surname;
    this.data.user.address = this.profileForInput.address;

    this.isEditing = false;
  }
}
