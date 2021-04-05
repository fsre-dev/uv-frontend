import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {MemberComponent} from './member/member.component';
import {DocumentsComponent} from './documents/documents.component';
import {AddMemberComponent} from './member/add-member/add-member.component';
import {EditMemberComponent} from './member/edit-member/edit-member.component';
import {AddTicketComponent} from './ticket/add-ticket/add-ticket.component';
import {EditTicketComponent} from './ticket/edit-ticket/edit-ticket.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main', component: LayoutComponent, children: [
      {path: 'member' , component: MemberComponent},
      {path: 'addMember', component: AddMemberComponent},
      {path: 'editMember/:id', component: EditMemberComponent},
      {path: 'addTicket/:id', component: AddTicketComponent},
      {path: 'editTicket/:id', component: EditTicketComponent},
      {path: 'documents', component: DocumentsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
