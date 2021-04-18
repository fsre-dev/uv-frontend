import {Component, OnInit, ViewChild} from '@angular/core';
import {MemberService} from '../../services/member.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private memberService: MemberService,  private activatedRoute: ActivatedRoute) { }

  editMode = false
  documentForm: FormGroup
  members
  allMembers
  initDocument
  displayedColumns: string[] = ['firstName', 'lastName', 'identityCard', 'remove'];
  dataSource;
  totalElements;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  onSubmit() {
    this.memberService.updateDocument(this.documentForm.value, this.members).subscribe(data => {
      console.log(data);
      this.initDocument = data;
    }, error => {
      console.log(error.message);
    });
  }

  addMember(member) {
    this.members.push(member);
    this.dataSource = new MatTableDataSource(this.members);
  }

  removeMember(idToRemove) {
      for (let i = 0; i < this.members.length; ++i) {
        if (this.members[i].id === idToRemove) {
          this.members.splice(i, 1);
          this.dataSource = new MatTableDataSource(this.members);
        }
      }
  }

  alreadyPicked(id) {
    return this.members.map(data => data.id).indexOf(id) > -1;
  }

  ngOnInit() {
    this.memberService.getAllMembers().subscribe(data => {
      this.allMembers = data;
    }, null, () => {
    });
    this.activatedRoute.params.subscribe(params => {
      this.memberService.getDocument(+params.id).subscribe(dataDoc => {
        if (dataDoc) {
          this.setDocumentForm(dataDoc);
          this.members = dataDoc.members
          this.dataSource = new MatTableDataSource(dataDoc.members);
          this.totalElements =  dataDoc.members.length;
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = 10;
          this.initDocument = dataDoc;
        }
      });
    });
  }

  setDocumentForm(document: any) {
    this.documentForm = new FormGroup({
      id: new FormControl({value: document.id, disabled: !this.editMode}),
      event: new FormControl({value: document.event, disabled: !this.editMode}, [Validators.required]),
      description: new FormControl({value: document.description, disabled: !this.editMode}, [Validators.required]),
      eventDate: new FormControl({value: document.eventDate, disabled: !this.editMode}, [Validators.required]),
      totalCost: new FormControl({value: document.totalCost, disabled: !this.editMode}, [Validators.required]),
      pricePerMember: new FormControl({value: document.pricePerMember , disabled: !this.editMode}, [Validators.required]),
      deleted: new FormControl(false)
    });
  }

  resetForm()  {
    this.editMode = !this.editMode;
    this.documentForm = new FormGroup({
        id: new FormControl({value: this.initDocument.id, disabled: !this.editMode}),
        event: new FormControl({value: this.initDocument.event, disabled: !this.editMode}, [Validators.required]),
        description: new FormControl({value: this.initDocument.description, disabled: !this.editMode}, [Validators.required]),
        eventDate: new FormControl({value: this.initDocument.eventDate, disabled: !this.editMode}, [Validators.required]),
        totalCost: new FormControl({value: this.initDocument.totalCost, disabled: !this.editMode}, [Validators.required]),
        pricePerMember: new FormControl({value: this.initDocument.pricePerMember, disabled: !this.editMode}, [Validators.required]),
        deleted: new FormControl(false)
      });
  }
}
