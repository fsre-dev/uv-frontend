import {Component, OnInit, ViewChild} from '@angular/core';
import {MemberService} from '../services/member.service';
import {initPageIndex, initPageSize} from '../member/member.component';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import * as FileSaver from "file-saver";




@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor(private memberService: MemberService) {
  }

  displayedColumns: string[] = ['event', 'eventDate', 'description', 'totalPrice', 'info', 'export', 'delete'];
  dataSource;
  totalElements;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.initData();
  }

  onDelete(id) {
    this.memberService.deleteDocument(id).subscribe(data => {
      console.log(data);
      this.initData();
    }, err => {
      console.log(err.message);
    });
  }

  downloadFile(data) {
    const blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    FileSaver.saveAs(blob, 'document.xlsx');
  }

  onExport(id) {
    this.memberService.exportDocument(id).subscribe(data => {
      this.downloadFile(data);
    }, err => {
      console.log(err.message);
    });
  }


  onPageChange() {
    this.memberService.getDocuments(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(data => {
      this.setData(data);
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

  setData(data) {
    if (!data) {
      console.log('Data not found on requested page');
    } else {
      this.dataSource.data = data.content;
      this.totalElements = data.totalElements;
    }
  }

  initData() {
    this.memberService.getDocuments(initPageIndex, initPageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;

      this.totalElements = data.totalElements;
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = 10;
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

}
