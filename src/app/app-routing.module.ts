import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {MemberComponent} from "./member/member.component";
import {DocumentsComponent} from "./documents/documents.component";


const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'login', component: LoginComponent},
  { path:'main', component: LayoutComponent, children: [
      {path: 'member' , component: MemberComponent},
      {path: 'documents', component: DocumentsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
