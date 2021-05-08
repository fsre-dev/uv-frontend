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
import {TicketComponent} from './ticket/ticket.component';
import {InfoComponent} from './documents/info/info.component';
import {UserGuard} from './user.guard';
import {UserComponent} from './user/user/user.component';
import {AdminGuard} from './admin.guard';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main', component: LayoutComponent, children: [
      {path: 'member' , component: MemberComponent, canActivate: [UserGuard]},
      {path: 'addMember', component: AddMemberComponent, canActivate: [UserGuard]},
      {path: 'editMember/:id', component: EditMemberComponent, canActivate: [UserGuard]},
      {path: 'tickets', component: TicketComponent, canActivate: [UserGuard]},
      {path: 'addTicket/:id', component: AddTicketComponent, canActivate: [UserGuard]},
      {path: 'editTicket/:id', component: EditTicketComponent, canActivate: [UserGuard]},
      {path: 'documents', component: DocumentsComponent, canActivate: [UserGuard]},
      {path: 'infoDocument/:id', component: InfoComponent, canActivate: [UserGuard]},
      {path: 'createDocument', component: InfoComponent, canActivate: [UserGuard]},
      {path: 'users', component: UserComponent, canActivate: [AdminGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
