import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {}

  isUserSuperAdmin = false

  ngOnInit() {
  }

  userIsAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.role === 'ROLE_SUPER_ADMIN') {
      this.isUserSuperAdmin = true;
    }
    return this.isUserSuperAdmin
  }
}
