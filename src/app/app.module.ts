import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './layout/layout.component';
import {TopnavComponent} from './layout/topnav/topnav.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {MemberComponent} from './member/member.component';
import {DocumentsComponent} from './documents/documents.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MemberService} from './services/member.service';
import {AuthenticationService} from './services/authentication.service';
import {MatModule} from './modules/mat/mat.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    TopnavComponent,
    SidebarComponent,
    MemberComponent,
    DocumentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatModule

  ],
  providers: [MemberService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
