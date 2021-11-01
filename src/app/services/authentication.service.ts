import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { baseURL } from './member.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router, ) {
  }

  login(username: string, password: string) {
   return this.http.post<any>( baseURL + 'api/user/authenticate', null, {
      headers: {
        authorization: 'Basic ' + btoa(username + ':' + password)
      }
    }).toPromise().then(data => {
      this.router.navigate(['main']);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', 'Basic ' + btoa(username + ':' + password))
    });
  }

  logout() {
    return this.http.get<any>(baseURL + 'api/logout').toPromise().then(data => {localStorage.clear(); this.router.navigate(['/login']);
  });
  }
}
