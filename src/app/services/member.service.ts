import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMembers(page: string, size: string) {
    const urlParams = new HttpParams().append('page', page).append('size', size);

    return this.http.get<any>('api/member/all', {params: urlParams});
  }
}
