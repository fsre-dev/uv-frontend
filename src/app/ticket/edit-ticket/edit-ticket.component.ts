import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss']
})
export class EditTicketComponent implements OnInit {

  constructor(private memberService: MemberService, private activatedRoute: ActivatedRoute) {
  }

  memberId
  ticketForm: FormGroup

  onSubmit() {
    this.memberService.editTicket(this.ticketForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error.message);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.memberService.getTicket(+params.id).subscribe(data => {
          if (data) {
            this.setTicketForm(data);
          }
      });
    });
  }

  setTicketForm(ticket: any) {
    this.ticketForm = new FormGroup({
      member: new FormControl(ticket.member.id, Validators.required),
      sector: new FormControl(ticket.sector, [Validators.required]),
      row: new FormControl(ticket.row, [Validators.required]),
      seat: new FormControl(ticket.seat, [Validators.required]),
      reservationDate: new FormControl(ticket.reservationDate, [Validators.required]),
      opponent: new FormControl(ticket.opponent, [Validators.required]),
      gameDate: new FormControl(ticket.gameDate, [Validators.required]),
      price: new FormControl(ticket.price, [Validators.required]),
      deleted: new FormControl(false)
    });
  }
}
