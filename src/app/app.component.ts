import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ispit-app';

  constructor(public userService: UserService) { }

  ngOnInit() { }
}

