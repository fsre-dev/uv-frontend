import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
   return this.http.post<any>('/api/user/authenticate', null, {
      headers: {
        authorization: 'Basic ' + btoa(username + ':' + password)
      }
    });
  }

  logout() {
    return this.http.get<any>('/api/logout');
  }
}
