import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Member} from '../models/member';
import { environment } from 'src/environments/environment.prod';

export const baseURL: string = environment.backend ? environment.backend.baseURL : ""
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  token = localStorage.getItem("token")

  getMembers(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size).append('isDeleted', 'false');

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>(baseURL + 'api/member/all', {params: urlParams,  headers: {
      authorization: this.token 
    }});
  }

  getAllMembers() {
    return this.http.get<any>(baseURL + 'api/member/all', { headers: {
      authorization: this.token 
    }});
  }

  getMember(id: string) {
    const idParams = new HttpParams().append('id', id);

    return this.http.get<Member>(baseURL + 'api/member', {params: idParams,  headers: {
      authorization: this.token 
    }});
  }

  postMember(member) {
    return this.http.post<Member>(baseURL + 'api/member', member, { headers: {
      authorization: this.token 
    }});
  }

  editMember(member, id) {
    return this.http.put<Member>(baseURL + 'api/member/' + id, member, { headers: {
      authorization: this.token 
    }});
  }

  deleteMember(memberId) {
    return this.http.put<Member>(baseURL + `api/member/delete/` + memberId, null, { headers: {
      authorization: this.token 
    }});
  }

  getTickets(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size);

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>(baseURL + 'api/ticket', {params: urlParams,  headers: {
      authorization: this.token 
    }});
  }

  getTicket(id) {
    return this.http.get<any>(baseURL + 'api/ticket/' + id, { headers: {
      authorization: this.token 
    }});
  }

  postTicket(ticket) {
    return this.http.post<any>(baseURL + 'api/ticket/', ticket, { headers: {
      authorization: this.token 
    }});
  }

  editTicket(ticket) {
    return this.http.put<any>(baseURL + 'api/ticket/' + ticket.id, ticket, { headers: {
      authorization: this.token 
    }});
  }

  deleteTicket(id) {
    return this.http.delete<any>(baseURL + 'api/ticket/' + id, { headers: {
      authorization: this.token 
    }});
  }

  getDocuments(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size).append('isDeleted', 'false');

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>(baseURL + 'api/document', {params: urlParams,  headers: {
      authorization: this.token 
    }});
  }

  getDocument(documentId) {
    return this.http.get<any>(baseURL + 'api/document/' + documentId, { headers: {
      authorization: this.token 
    }});
  }

  createDocument(document, members) {
    document.members = members.map(member => { return {id: member.id}; })
    return this.http.post<any>(baseURL + 'api/document', document, { headers: {
      authorization: this.token 
    }});
  }

  deleteDocument(documentId) {
    return this.http.put<any>(baseURL + 'api/document/delete/' + documentId, null, { headers: {
      authorization: this.token 
    }});
  }

  updateDocument(document, members) {
    document.members = members.map(member =>  { return {id: member.id}; });
    return this.http.put<any>(baseURL + 'api/document/' + document.id, document, { headers: {
      authorization: this.token 
    }});
  }

  exportDocument(documentId) {
    return this.http.get<any>(baseURL + 'api/document/export/' + documentId, { responseType: 'blob' as 'json',  headers: {
      authorization: this.token 
    }});
  }

  getUsers(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size).append('isDeleted', 'false');

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>(baseURL + 'api/user/all', {params: urlParams, headers: {
      authorization: this.token 
    }});
  }

  getUser(userId) {
    return this.http.get<any>(baseURL + 'api/user/' + userId,{ headers: {
      authorization: this.token 
    }});
  }

  createUser(user) {
    return this.http.post<any>(baseURL + 'api/user/superadmin/create', user, { headers: {
      authorization: this.token 
    }});
  }

  deleteUser(userId) {
    return this.http.put<any>(baseURL + 'api/user/superadmin/delete/' + userId, null, { headers: {
      authorization: this.token 
    }});
  }

  updateUser(user) {
    return this.http.put<any>(baseURL + 'api/user/superadmin/' + user.id, user, { headers: {
      authorization: this.token 
    }});
  }
}
