import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  constructor(private memberService: MemberService, private activatedRoute: ActivatedRoute) { }

  memberId

  ticketForm = new FormGroup({
    member: new FormControl('', Validators.required),
    sector: new FormControl('', [Validators.required]),
    row: new FormControl('', [Validators.required]),
    seat: new FormControl('', [Validators.required]),
    reservationDate: new FormControl('', [Validators.required]),
    opponent: new FormControl('', [Validators.required]),
    gameDate: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    deleted: new FormControl(false)
  });

  onSubmit() {
    this.memberService.postTicket(this.ticketForm.value).subscribe(data => {
      console.log(data);
      this.ticketForm.reset({
        member: {id: this.memberId},
        deleted: false
      })
    }, error => {
      console.log(error.message);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.memberId = +params.id
      this.ticketForm.patchValue({
        member: {id: this.memberId}
      });
    });
  }

}
