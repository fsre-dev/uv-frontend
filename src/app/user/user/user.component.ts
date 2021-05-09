import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {initPageIndex, initPageSize} from '../../member/member.component';
import {MatTableDataSource} from '@angular/material/table';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private memberService: MemberService) {
  }

  displayedColumns: string[] = ['username', 'role', 'email', 'edit', 'delete'];
  dataSource;
  totalElements;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.initData();
  }

  onDelete(id) {
    this.memberService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.initData();
    }, err => {
      console.log(err.message);
    });
  }


  onPageChange() {
    this.memberService.getUsers(this.paginator.pageIndex.toString(), this.paginator.pageSize.toString()).subscribe(data => {
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
    this.memberService.getUsers(initPageIndex, initPageSize).subscribe(data => {
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
