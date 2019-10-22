import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  @Output() toggleEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  toggle() {
    this.toggleEvent.emit()
  }


}
