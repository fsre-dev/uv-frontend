import { Component, OnInit } from '@angular/core';
import {MemberService} from '../../services/member.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private memberService: MemberService,  private activatedRoute: ActivatedRoute) { }

  editMode = false
  documentForm: FormGroup
  initDocument

  onSubmit() {
    this.memberService.updateDocument(this.documentForm.value).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error.message);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.memberService.getDocument(+params.id).subscribe(data => {
        if (data) {
          this.setDocumentForm(data);
          this.initDocument = data;
        }
      });
    });
  }

  setDocumentForm(document: any) {
    console.log(document)
    this.documentForm = new FormGroup({
      id: new FormControl({value: document.id, disabled: !this.editMode}, ),
      event: new FormControl({value: document.event, disabled: !this.editMode}, Validators.required),
      description: new FormControl({value: document.description, disabled: !this.editMode}, [Validators.required]),
      eventDate: new FormControl({value: document.eventDate, disabled: !this.editMode}, [Validators.required]),
      totalCost: new FormControl({value: document.totalCost, disabled: !this.editMode}, [Validators.required]),
      pricePerMember: new FormControl({value: document.pricePerMember , disabled: !this.editMode}, [Validators.required])
    });
  }

  resetForm()  {
    this.editMode = !this.editMode;
    this.documentForm = new FormGroup({
        id: new FormControl({value: this.initDocument.id, disabled: !this.editMode}),
        event: new FormControl({value: this.initDocument.event, disabled: !this.editMode}, Validators.required),
        description: new FormControl({value: this.initDocument.description, disabled: !this.editMode}, [Validators.required]),
        eventDate: new FormControl({value: this.initDocument.eventDate, disabled: !this.editMode}, [Validators.required]),
        totalCost: new FormControl({value: this.initDocument.totalCost, disabled: !this.editMode}, [Validators.required]),
        pricePerMember: new FormControl({value: this.initDocument.pricePerMember, disabled: !this.editMode}, [Validators.required])
      });
  }
}
