import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {

  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(data => {
      this.router.navigate(['main']);
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

}
