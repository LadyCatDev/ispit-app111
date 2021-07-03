import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  errorExists = false;
  errorText = "";

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  //Prijava korisnika sa podacima iz forme za prijavu
  onSubmit(form: NgForm): void {
    var email = form.value.email;
    var password = form.value.password;
    var user = this.userService.getUser(email);
    if (!user) {
      this.errorExists = true;
      this.errorText = "Nema registrovanog korisnika sa zadatim mejlom!";
      return;
    }
    var isPasswordValid = this.userService.isPasswordCorrect(email, password);
    if (!isPasswordValid) {
      this.errorExists = true;
      this.errorText = "Pogrešan unos šifre!";
      return;
    }
    this.errorExists = false;
    this.userService.isSignedIn = true;
    this.router.navigate(['']);
  }

  toSignup() {
    this.router.navigate(['/signup']);
  }


}
