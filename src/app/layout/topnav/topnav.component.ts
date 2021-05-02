import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  @Output() toggleEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  toggle() {
    this.toggleEvent.emit();
  }

  logout() {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
