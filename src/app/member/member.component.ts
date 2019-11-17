import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material';
import {MemberService} from '../services/member.service';


const initPageSize = '10';
const initPageIndex = '0';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(private memberService: MemberService) {
  }

  displayedColumns: string[] = ['firstName', 'lastName', 'cardNumber', 'city'];
  dataSource;
  totalElements;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.initData();
  }

  applyFilter(searchValue: string) {
    this.dataSource.filter = searchValue;
  }

  onPageChange() {
    this.memberService.getMembers(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(data => {
      if (!data) {
        this.initData();
        console.log('Data not found on requested page. Restarting data on initial state');
      } else {
        this.dataSource.data = data.content;
        this.totalElements = data.totalElements;
      }
    }, error => {
      console.log(error.message);
      console.log(error.status);
    });
  }

  initData() {
    this.memberService.getMembers(initPageIndex, initPageSize).subscribe(data => {
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
