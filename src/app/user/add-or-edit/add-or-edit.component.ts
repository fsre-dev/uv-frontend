import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../../services/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EditMode} from '../../documents/info/info.component';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  editMode: EditMode

  constructor(private memberService: MemberService,  private activatedRoute: ActivatedRoute, private router: Router) {
    this.editMode = this.router.url.indexOf("create") > -1 ? "CREATE" : "EDIT"
    this.editToggled = this.router.url.indexOf("create") > -1 ? true : false
  }

  editToggled: boolean
  userForm: FormGroup
  initUser
  dataSource;

  onSubmit() {
    if(this.editMode === "EDIT")  {
      this.memberService.updateUser(this.userForm.value).subscribe(data => {
        this.initUser = data;
      }, error => {
        console.log(error.message);
      });
    } else {
      this.memberService.createUser(this.userForm.value).subscribe(data => {
        console.log(data)
        this.resetForm();
      }, error => {
        console.log(error.message)
      })
    }
  }

  ngOnInit() {
    if (this.editMode === 'EDIT') {
      this.activatedRoute.params.subscribe(params => {
        this.memberService.getUser(+params.id).subscribe(dataUser => {
          if (dataUser) {
            this.setUserForm(dataUser);
            this.initUser = dataUser;
          }
        });
      });
    } else {
      this.resetForm();
    }
  }

  setUserForm(user: any) {
    if(this.editMode === "EDIT") {
      this.userForm = new FormGroup({
        id: new FormControl({value: user.id, disabled: !this.editMode}),
        role: new FormControl({value: user.role, disabled: !this.editMode}),
        username: new FormControl({value: user.username, disabled: !this.editMode}, [Validators.required]),
        password: new FormControl({value: "", disabled: !this.editMode}, [Validators.required]),
        email: new FormControl({value: user.email, disabled: !this.editMode}, [Validators.required]),
        deleted: new FormControl(false)
      });
    }
  }

  resetForm()  {
    if(this.editMode === "EDIT") {
      this.editToggled = !this.editToggled
      this.userForm = new FormGroup({
        id: new FormControl({value: this.initUser.id, disabled: !this.editMode}),
        role: new FormControl({value: this.initUser.event, disabled: !this.editMode}, [Validators.required]),
        username: new FormControl({value: this.initUser.description, disabled: !this.editMode}, [Validators.required]),
        password: new FormControl({value: this.initUser.eventDate, disabled: !this.editMode}, [Validators.required]),
        email: new FormControl({value: this.initUser.totalCost, disabled: !this.editMode}, [Validators.required]),
        deleted: new FormControl(false)
      });
    } else {
      this.userForm = new FormGroup({
        id: new FormControl({value: "", disabled: !this.editMode}),
        role: new FormControl({value: "", disabled: !this.editMode}, [Validators.required]),
        username: new FormControl({value: "", disabled: !this.editMode}, [Validators.required]),
        password: new FormControl({value: "", disabled: !this.editMode}, [Validators.required]),
        email: new FormControl({value: "", disabled: !this.editMode}, [Validators.required]),
        deleted: new FormControl(false)
      });
    }
  }

}
