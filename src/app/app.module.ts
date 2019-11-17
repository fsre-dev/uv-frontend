import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LayoutComponent} from './layout/layout.component';
import {TopnavComponent} from './layout/topnav/topnav.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MemberComponent} from './member/member.component';
import {DocumentsComponent} from './documents/documents.component';
import {MatPaginatorModule, MatTableModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MemberService} from './services/member.service';
import {AuthenticationService} from './services/authentication.service';


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
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [MemberService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
