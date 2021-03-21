import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Member} from '../../models/member';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  constructor(private memberService: MemberService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  id: string;
  memberForm: FormGroup;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.memberService.getMember(this.id).subscribe(data => {
        if (data) {
          this.setMemberForm(data);
        } else {
          this.router.navigate(['/main/member']);  // treba not found page
        }
      }, error => {
        console.log(error.status);
        this.router.navigate(['/main/member']);   // treba not found page
      });
    });
  }

  onSubmit() {
    this.memberService.editMember(this.memberForm.value, this.id).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err.message);
    });
  }

  setMemberForm(member: Member) {this.memberForm = new FormGroup({
      firstName: new FormControl(member.firstName, [Validators.required]),
      lastName: new FormControl(member.lastName, [Validators.required]),
      email: new FormControl(member.email, [Validators.required, Validators.email]),
      address: new FormControl(member.address, [Validators.required]),
      birthDate: new FormControl(member.birthDate, [Validators.required]),
      city: new FormControl(member.city, [Validators.required]),
      state: new FormControl(member.state, [Validators.required]),
      phoneNumber: new FormControl(member.phoneNumber, [Validators.required]),
      cellNumber: new FormControl(member.cellNumber, [Validators.required]),
      cardNumber: new FormControl(member.cardNumber, [Validators.required]),
      identityCard: new FormControl(member.identityCard, [Validators.required]),
      oib: new FormControl(member.oib, [Validators.required]),
      passportNumber: new FormControl(member.passportNumber, [Validators.required]),
      gender: new FormControl(member.gender, [Validators.required]),
      memberType: new FormControl(member.memberType, [Validators.required]),
      deleted: new FormControl(false),
      membership: new FormGroup({
        memberFrom: new FormControl(member.membership.memberFrom, [Validators.required]),
        memberTo: new FormControl(member.membership.memberTo, [Validators.required]),
        price: new FormControl(member.membership.price, [Validators.required])
      }),
    });
  }

}


