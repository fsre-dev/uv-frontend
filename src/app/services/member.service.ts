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

    return this.http.get<any>('api/document/all', {params: urlParams});
  }

  createDocument(document) {
    return this.http.post<any>('api/document', document)
  }

  deleteDocument(documentId) {
    return this.http.put<any>('api/document/delete/' + documentId, null)
  }

  updateDocument(document) {
    return this.http.put<any>('api/document/' + document.id, document)
  }
}
