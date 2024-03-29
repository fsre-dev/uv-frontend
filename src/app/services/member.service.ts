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
    let urlParams = new HttpParams().append('page', page).append('size', size).append('isDeleted', 'false');

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>('api/member/all', {params: urlParams});
  }

  getAllMembers() {
    return this.http.get<any>('api/member/all');
  }

  getMember(id: string) {
    const idParams = new HttpParams().append('id', id);

    return this.http.get<Member>('api/member', {params: idParams});
  }

  postMember(member) {
    return this.http.post<Member>('api/member', member);
  }

  editMember(member, id) {
    return this.http.put<Member>('api/member/' + id, member);
  }

  deleteMember(memberId) {
    return this.http.put<Member>(`api/member/delete/` + memberId, null);
  }

  getTickets(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size);

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>('api/ticket', {params: urlParams});
  }

  getTicket(id) {
    return this.http.get<any>('api/ticket/' + id);
  }

  postTicket(ticket) {
    return this.http.post<any>('api/ticket/', ticket);
  }

  editTicket(ticket) {
    return this.http.put<any>('api/ticket/' + ticket.id, ticket);
  }

  deleteTicket(id) {
    return this.http.delete<any>('api/ticket/' + id);
  }

  getDocuments(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size).append('isDeleted', 'false');

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>('api/document', {params: urlParams});
  }

  getDocument(documentId) {
    return this.http.get<any>('api/document/' + documentId);
  }

  createDocument(document, members) {
    document.members = members.map(member => { return {id: member.id}; })
    return this.http.post<any>('api/document', document);
  }

  deleteDocument(documentId) {
    return this.http.put<any>('api/document/delete/' + documentId, null);
  }

  updateDocument(document, members) {
    document.members = members.map(member =>  { return {id: member.id}; });
    return this.http.put<any>('api/document/' + document.id, document);
  }

  exportDocument(documentId) {
    return this.http.get<any>('api/document/export/' + documentId, { responseType: 'blob' as 'json', });
  }

  getUsers(page: string, size: string, options?: string, optionsValue?: string) {
    let urlParams = new HttpParams().append('page', page).append('size', size).append('isDeleted', 'false');

    if (options && optionsValue) {
      urlParams = urlParams.append(options, optionsValue.trim());
    }

    return this.http.get<any>('api/user/all', {params: urlParams});
  }

  getUser(userId) {
    return this.http.get<any>('api/user/' + userId);
  }

  createUser(user) {
    return this.http.post<any>('api/user/superadmin/create', user);
  }

  deleteUser(userId) {
    return this.http.put<any>('api/user/superadmin/delete/' + userId, null);
  }

  updateUser(user) {
    return this.http.put<any>('api/user/superadmin/' + user.id, user);
  }
}
