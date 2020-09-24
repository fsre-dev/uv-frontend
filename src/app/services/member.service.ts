import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Member} from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMembers(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size);

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>('api/member/all', {params: urlParams});
  }

  getMember(id: string) {
    const idParams = new HttpParams().append('id', id);

    return this.http.get<Member>('api/member', {params: idParams});
  }

  postMember(member) {
    return this.http.post<Member>('api/member', member);
  }
}
