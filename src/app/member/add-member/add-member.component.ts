import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  constructor(private memberService: MemberService) {
  }

  memberForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    cellNumber: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('', [Validators.required]),
    identityCard: new FormControl('', [Validators.required]),
    oib: new FormControl('', [Validators.required]),
    passportNumber: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    memberType: new FormControl('', [Validators.required]),
    membership: new FormGroup({
      memberFrom: new FormControl('', [Validators.required]),
      memberTo: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })
  });

  ngOnInit() {
  }

  onSubmit() {
    this.memberService.postMember(this.memberForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error.message);
    });
  }

}
