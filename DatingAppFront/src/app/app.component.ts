import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'DatingAppFront';
  jwtHelper = new JwtHelperService();

  constructor(private authServices: AuthService){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token){
      this.authServices.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authServices.currentUser = user;
      this.authServices.changeMemberPhoto(user.photoUrl);
    }
  }
}
