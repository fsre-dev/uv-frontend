import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { baseURL } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
   return this.http.post<any>( baseURL + '/api/user/authenticate', null, {
      headers: {
        authorization: 'Basic ' + btoa(username + ':' + password)
      }
    });
  }

  logout() {
    return this.http.get<any>(baseURL + '/api/logout');
  }
}
